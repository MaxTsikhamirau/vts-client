const baseUrl = process.env.REACT_APP_SERVER_URL;

function call(url, params, method, body, handle) {
    const validBody = body ? JSON.stringify(body) : undefined;
    console.log(`Execute ${method} ${baseUrl + url} ${validBody ? 'with ' + validBody : ''}`);
    return fetch(baseUrl + url,
        {
            method,
            body: validBody,
            headers: new Headers({
		        'Content-Type': 'application/json',
            'x-auth': sessionStorage.token
            })
        })
        .then(data => data.ok ? data.json() : Promise.reject({ status: data.status }))
        .then(obj => handle(obj))
        .catch(err => Promise.reject(err));
}

export function get(url, params, handle) {
    return call(url, params, 'GET', null, handle);
}

export function post(url, params, body, handle) {
    return call(url, params, 'POST', body, handle);
}

export function put(url, params, body, handle) {
    return call(url, params, 'PUT', body, handle);
}

export function remove(url, params, handle) {
    return call(url, params, 'DELETE', null, handle);
}
