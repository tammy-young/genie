import json
from django.http import JsonResponse
from django.views import View
import requests


class SearchView(View):

    BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php"
    USER_COOKIE = "pdhUser=460859043%3A2b888bad5e9867832ac89b36c8383940%3Asdw161.stardoll.com"

    def get(self, request):
        operation = request.GET.get("operation", "")
        if (operation == "getBrands"):
            return JsonResponse(self.get_brands(self.get_page_content()))
        return JsonResponse({"data": "get lolol!"})
    
    def get_page_content(self):
        session = requests.Session()
        headers = {
            'Cookie': '; '.join([self.USER_COOKIE])
        }
        response = session.get(self.BAZAAR_URL, headers=headers)

        page_content = json.loads(response.content.decode('utf-8'))

        return page_content
    
    def get_brands(self, page_content):
        page_content = self.get_page_content()
        brands = page_content["brands"]["fashion"]["brand"]
        return {"brands": brands}
