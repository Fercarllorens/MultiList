import requests

import global_variables as gv

def request_to_api(endpoint: str, query_params: str) -> dict:
    headers = {
        'x-rapidapi-host': "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        'x-rapidapi-key': "7ea1b71fdcmshee73a4577e00c1ep1c33c0jsn6876e3efe7ee"
    } 
    try:
        return  requests.request("GET", gv.VIDEO.URL, headers=headers, params=query_params).json()
    except:
        return {gv.COMMON.ERROR: gv.VIDEO.ERRORS.REQUEST}
