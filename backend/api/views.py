import json
import time
from bs4 import BeautifulSoup
import requests

from django.http import JsonResponse
from django.views import View

BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php"
SEARCH_URL = BAZAAR_URL + "?search&type=fashion&Price=24"
ITEM_IMAGE_URL = "http://cdn.stardoll.com/itemimages/76/0/98/{}.png"
USER_COOKIE = "pdhUser=460859043%3A2b888bad5e9867832ac89b36c8383940%3Asdw161.stardoll.com"
SELLER_INFO_URL = "http://www.stardoll.com/en/user/sellItems.php?id={}"
ITEM_INFO = ["brand", "name", "currencyType", "originalPrice", "sellPrice", "sellerId"]
MAX_ITEMS_AT_ONCE = 20

class BazaarSearchView(View):

    def make_request(self, url, html=False):
        session = requests.Session()
        headers = {
            'Cookie': USER_COOKIE
        }
        response = session.get(url, headers=headers)
        decoded_content = response.content.decode("utf-8")
        if html:
            page_content = BeautifulSoup(decoded_content, 'html.parser')
        else:
            page_content = json.loads(decoded_content)
        return page_content


class SearchView(BazaarSearchView):

    ITEMS_KEY = "items"

    def get(self, request):
        search_url = SEARCH_URL

        item_name = request.GET.get("itemName", "")

        brand_id = request.GET.get("brandId", "")
        search_url += f"&brands={brand_id}" if brand_id else ""
        
        min_price = request.GET.get("minPrice", "")
        search_url += f"&minPrice={min_price}" if min_price else ""

        max_price = request.GET.get("maxPrice", "")
        search_url += f"&maxPrice={max_price}" if max_price else ""

        currency_type = request.GET.get("currencyType", "")
        search_url += f"&currencyType={currency_type}" if (max_price or max_price) and currency_type else ""
        
        items = []
        item_ids = []
        stop_search_time = time.time() + 10

        while time.time() < stop_search_time and len(items) < MAX_ITEMS_AT_ONCE:
            returned_page = self.make_request(search_url)
            
            # if there are no items on the page then get a new page
            if self.ITEMS_KEY not in returned_page:
                continue
            returned_items = returned_page[self.ITEMS_KEY]

            for item in returned_items:
                item_id = item['itemId']
                add_item = False

                if item_name:
                    searched_item_name = item['name'].lower()

                    if item_name in searched_item_name:
                        add_item = True
                else:
                    if item_id not in item_ids:
                        add_item = True
                        item_ids.append(item_id)

                if add_item:
                    item_info = self.get_item_info(item)
                    items.append(item_info)

                if len(items) >= MAX_ITEMS_AT_ONCE:
                    break

        return JsonResponse({"items": items})

    def get_item_info(self, item):
        item_id = item['itemId']
        item_info = {info: item[info] for info in ITEM_INFO}
        item_image = ITEM_IMAGE_URL.format(item_id)
        item_info["itemImage"] = item_image

        seller_page = self.make_request(SELLER_INFO_URL.format(item_info["sellerId"]), html=True)
        username_item = seller_page.find(class_='uname')
        username_value = username_item.text if username_item else "Unknown Seller"
        item_info["sellerUsername"] = username_value

        return item_info


class BrandsView(BazaarSearchView):

    def get(self, request):
        return JsonResponse(self.get_brands())

    def get_brands(self):
        page_content = self.make_request(BAZAAR_URL)
        brands = page_content["brands"]["fashion"]["brand"]
        brands_id_to_name = {brand['id']: brand['name'] for brand in brands}
        brands_name_to_id = {brand['name']: brand['id'] for brand in brands}
        return {"brandsIdToName": brands_id_to_name, "brandsNameToId": brands_name_to_id}
