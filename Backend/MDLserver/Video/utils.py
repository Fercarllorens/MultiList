import requests
from .credentials import API_HOST, API_KEY, TMDB_API_TOKEN, TMDB_API_KEY

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


def request_tmdb_api(endpoint, query_params):
    query_params['api_key'] = TMDB_API_KEY
    try: 
        return requests.request("GET", gv.VIDEO.URL.TMDB + endpoint, params=query_params).json()
    except:
        return {gv.COMMON.ERROR: gv.VIDEO.ERRORS.REQUEST}