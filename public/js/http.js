const serverAddr = 'http://localhost:8084'

const HTTPPostRequest = (url, data) => {
    return fetch(serverAddr + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

const HTTPGetRequest = (url) => {
    return fetch(serverAddr + url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
}

