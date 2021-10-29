import { Dict } from './interfaces'

const base_url = "http://localhost:8000/"

// We can modify this function to treat the errors as desired
const errorHandler = (res: Response): Response => {
    if (!res.ok) console.error(res.statusText)
    return res
}   

// Returns the json object
const fetchHandler = (_endpoint: string, _method: "GET" | "POST" | "PUT" | "DELETE", _body: Dict<string | number>): object => {
    return fetch(base_url+_endpoint, {method: _method, body: JSON.stringify(_body), headers: {'Content-Type': 'application/json'}})
            .then(errorHandler)
            .then((res) => {return res? res.json() : res; })
            .then((json) => {if(json) return json; })
}

// Executes the callback passing it the converted json
const fetchHandlerCb = (_endpoint: string, _method: "GET" | "POST" | "PUT" | "DELETE", _body: Dict<string | number>, cb: (json: object) => void ): void => {
    fetch(base_url+_endpoint, {method: _method, body: JSON.stringify(_body), headers: {'Content-Type': 'application/json'}})
            .then(errorHandler)
            .then((res) => res.json())
            .then((json) => cb(json))
}

export { fetchHandler, fetchHandlerCb }