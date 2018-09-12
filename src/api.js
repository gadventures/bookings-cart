function getCookie(name) {
    let cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
    return cookie ? cookie.pop() : ''
}

const apiRequest = ({url, method, body = {}, headers}) => {
    const reqMeta = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            ...headers
        }
    }
    if (method !== 'GET') {
        reqMeta.body = JSON.stringify(body)
    }
    return fetch(new Request(url, reqMeta))
}

export const API = {
    get: (params) => apiRequest({method: 'GET', ...params}),
    post: (params) => apiRequest({method: 'POST', ...params}),
    patch: (params) => apiRequest({method: 'PATCH', ...params}),
    delete: (params) => apiRequest({method: 'DELETE', ...params})
}
