import json
from django.http import JsonResponse
from django.views import View
import requests

BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php"
USER_COOKIE = "pdhUser=460859043%3A2b888bad5e9867832ac89b36c8383940%3Asdw161.stardoll.com"


class BazaarSearchView(View):

    def get_page_content(self):
        session = requests.Session()
        headers = {
            'Cookie': '; '.join([USER_COOKIE])
        }
        response = session.get(BAZAAR_URL, headers=headers)
        page_content = json.loads(response.content.decode('utf-8'))
        return page_content


class SearchView(BazaarSearchView):

    def get(self, request):
        return JsonResponse()


class BrandsView(BazaarSearchView):

    def get(self, request):
        return JsonResponse(self.get_brands(super().get_page_content()))

    def get_brands(self, page_content):
        page_content = self.get_page_content()
        brands = page_content["brands"]["fashion"]["brand"]
        return {"brands": brands}
