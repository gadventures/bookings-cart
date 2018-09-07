
const apiRequest = ({url, method, body = {}, headers}) => {
    const reqMeta = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        mode: 'cors'
    }
    if (method !== 'GET') {
        reqMeta.body = body
    }
    return fetch(new Request(url, reqMeta))
}

export const API = {
    get: (params) => apiRequest({method: 'GET', ...params}),
    post: (params) => apiRequest({method: 'POST', ...params}),
    patch: (params) => apiRequest({method: 'PATCH', ...params}),
    delete: (params) => apiRequest({method: 'DELETE', ...params})
}
