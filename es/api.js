var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getCookie(name) {
    var cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookie ? cookie.pop() : '';
}

var apiRequest = function apiRequest(_ref) {
    var url = _ref.url,
        method = _ref.method,
        _ref$body = _ref.body,
        body = _ref$body === undefined ? {} : _ref$body,
        headers = _ref.headers;

    var reqMeta = {
        method: method,
        headers: _extends({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }, headers)
    };
    if (method !== 'GET') {
        reqMeta.body = JSON.stringify(body);
    }
    return fetch(new Request(url, reqMeta));
};

export var API = {
    get: function get(params) {
        return apiRequest(_extends({ method: 'GET' }, params));
    },
    post: function post(params) {
        return apiRequest(_extends({ method: 'POST' }, params));
    },
    patch: function patch(params) {
        return apiRequest(_extends({ method: 'PATCH' }, params));
    },
    delete: function _delete(params) {
        return apiRequest(_extends({ method: 'DELETE' }, params));
    }
};