import json
import time
import base64
from bs4 import BeautifulSoup
import requests

from django.http import JsonResponse
from django.views import View

BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php"
ITEM_IMAGE_URL = "http://cdn.stardoll.com/itemimages/76/0/98/{}.png"
USER_COOKIE = "pdhUser=460859043%3A2b888bad5e9867832ac89b36c8383940%3Asdw161.stardoll.com"
SELLER_INFO_URL = "http://www.stardoll.com/en/user/yearbook.php?id={}"
ITEM_INFO = ["brand", "name", "currencyType", "originalPrice", "sellPrice", "sellerId"]

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

    def get(self, request):
        search_url = BAZAAR_URL + "?search&type=fashion&Price=24"
        brand_id = request.GET.get("brandId", "")
        search_url += f"&brands={brand_id}" if brand_id else ""
        
        min_price = request.GET.get("minPrice", "")
        search_url += f"&minPrice={min_price}" if min_price else ""

        max_price = request.GET.get("maxPrice", "")
        search_url += f"&maxPrice={max_price}" if max_price else ""

        currency_type = request.GET.get("currencyType", "")
        search_url += f"&currency_type={currency_type}" if (max_price or max_price) and currency_type else ""

        item_name = request.GET.get("itemName", "")
        if item_name:
            items = self.search_by_item_name(item_name)

        else:
            items = []
            item_ids = []
            stop_search_time = time.time() + 30

            while time.time() < stop_search_time and len(items) < 10:
                returned_items = self.make_request(search_url)["items"]

                for item in returned_items:
                    item_id = item['itemId']

                    if item_id not in item_ids:
                        item_info = {info: item[info] for info in ITEM_INFO}
                        
                        item_image = base64.b64encode(requests.get(ITEM_IMAGE_URL.format(item_id)).content).decode("utf-8")
                        item_info["itemImage"] = item_image

                        seller_page = self.make_request(SELLER_INFO_URL.format(item_info["sellerId"]), html=True)
                        username_item = seller_page.find(class_='uname')
                        username_value = username_item.text if username_item else "Unknown Seller"
                        item_info["sellerUsername"] = username_value
                        
                        items.append(item_info)
                        item_ids.append(item_id)

                    if len(items) >= 10:
                        break

        return JsonResponse({"items": items})
    
    def search_by_item_name(self, item_name):
        search_url = BAZAAR_URL + "?search&type=fashion&Price=24"
        pass


class BrandsView(BazaarSearchView):

    def get(self, request):
        return JsonResponse(self.get_brands())

    def get_brands(self):
        page_content = self.make_request(BAZAAR_URL)
        brands = page_content["brands"]["fashion"]["brand"]
        brands_id_to_name = {brand['id']: brand['name'] for brand in brands}
        brands_name_to_id = {brand['name']: brand['id'] for brand in brands}
        return {"brandsIdToName": brands_id_to_name, "brandsNameToId": brands_name_to_id}
