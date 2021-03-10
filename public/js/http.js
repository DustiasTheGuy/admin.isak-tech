const getServerAddr = (production) => {
    return production ? 
    'https://admin.isak-tech.tk' : 'http://localhost:8084';
}

const HTTPPostRequest = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

const HTTPGetRequest = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
}