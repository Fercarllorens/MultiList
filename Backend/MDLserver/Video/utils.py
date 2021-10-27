import requests
from .credentials import API_HOST, API_KEY

import global_variables as gv

def request_to_api(endpoint: str, query_params: str) -> dict:
    headers = {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
    } 
    try:       
        return  requests.request("GET", gv.VIDEO.URL.BASE + endpoint, headers=headers, params=query_params).json()
    except:
        return {gv.COMMON.ERROR: gv.VIDEO.ERRORS.REQUEST}
