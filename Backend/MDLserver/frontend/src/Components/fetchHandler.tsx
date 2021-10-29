import { Dict } from './interfaces'

const base_url = "http://localhost:8000/"

// We can modify this function to treat the errors as desired
const errorHandler = (res: Response): Response => {
    if (!res.ok) console.error(res.statusText)
    return res
}   

const fetchHanlder: object= (_endpoint: string, _method: "GET" | "POST" | "PUT" | "DELETE", _body: Dict<string | number>) => {
    return fetch(base_url+_endpoint, {method: _method, body: JSON.stringify(_body), headers: {'Content-Type': 'application/json'}})
            .then(errorHandler)
            .then((res) => {return res? res.json() : res; })
            .then((json) => {if(json) return json; })
}

export { fetchHanlder }