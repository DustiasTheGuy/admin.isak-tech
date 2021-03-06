export class HTTP {
    
    constructor(production) {
        this.serverAddr = this.getServerAddr(production);
        this.headers = { 'Content-Type': 'application/json' };

        console.log(this.serverAddr);
    }

    getServerAddr(production) {
        return production ? 
        'https://admin.isak-tech.tk' : 'http://localhost:8084';
    }

    // string, boolean
    GET(url, customUrl) {
        if(customUrl) {
            return fetch(url, {
                method: 'GET',
                headers: this.headers
            }).then(response => response.json());

        } else {
            return fetch(this.serverAddr + url, {
                method: 'GET',
                headers: this.headers
            }).then(response => response.json());
        }
    }

    POST(url, data) {
        return fetch(this.serverAddr + url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(response => response.json());
    }


    UPLOAD(url, data) {
        return fetch(this.serverAddr + url, {
            method: 'POST',
            body: data
        }).then(response => response.json());
    }
}