import { TableComponent } from '../components/table';
import { HTTP } from '../utils/http';

let http = new HTTP(true);

export class AnalyticsComponent {
    constructor(data) {
        this.data = data; 
        this.container = document.getElementsByClassName('table-body')[0];
    }

    init() {
        this.loadData();
    }

    loadData() {
        http.GET('https://paste.isak-tech.tk/analytics/load/load_all', true)
        .then(res => res.success ? this.render(res.data) : 
        console.log(res.message));
    }

    render(data) {
        data.forEach(row => {
            let div = document.createElement('div');
            div.className = 'table-row';
            div.innerHTML = `
                <span class="id">${row.id}</span>
                <span class="href">${row.href}</span>
                <span class="created">${row.created}</span>
                <span class="ip">${row.ip}</span>
            `
            this.container.appendChild(div);
        })

        new TableComponent().init();
    }
}