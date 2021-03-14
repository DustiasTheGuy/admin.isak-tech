export class APIComponent {
    constructor() {
        this.apiContainer = document.getElementById('api-container');
        this.APIRoutes = 
        [
            { path: "/api/posts",                 method:"GET",    data: null },
            { path: "/api/post/:id",              method:"GET",    data: null },
            { path: "/api/paginate/:page/:limit", method: "GET",   data: null },
            { path: "/api/delete",                method:"DELETE", data: { id: "uint64" }},
            { path: "/api/new",                   method: "POST",  data: { title: "string", body: "string", tags: "[]string" }},
            { path: "/api/update",                method: "PUT",   data: { id: "uint64", title: "string", body: "string", tags: "[]string" }}
        ];
    }

    init() {
        this.render();
    }

    render() {
        this.APIRoutes.forEach(el => {
            let div = document.createElement('div');
            div.classList.add('api-route');
            div.innerHTML = `
                <div>
                    <span>${el.path}</span>
                    <span>${el.method}</span>
                </div>
                <pre>${el.data != undefined ? JSON.stringify(el.data, null, 2) : 'No data required'}</pre>
            `
    
            this.apiContainer.appendChild(div);
        });
    }
}

