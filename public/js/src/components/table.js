import { timeSince } from '../utils/utils';
import { HTTPGetRequest, getServerAddr } from '../utils/http';

export class TableComponent {

    constructor() {
        this.thead = document.getElementById('t-head');
    }

    fixDates() {
        let dates = document.getElementsByClassName('created');
        for(let i = 0; i < dates.length; i++) {
            dates[i].textContent = timeSince(new Date(dates[i].textContent)) + ' ago'
        }
    }

    addEventListeners() {
        this.thead.childNodes.forEach(i => {
            i.addEventListener('mouseenter', (e) => {
                let className = e.target.textContent.replace(/\s/g, '').toLowerCase();
                let elements = document.getElementsByClassName(className);
                
                for(let i = 0; i < elements.length; i++) {
                    elements[i].classList.add('active');
                }
            });
    
            i.addEventListener('mouseleave', (e) => {
                let className = e.target.textContent.replace(/\s/g, '').toLowerCase();
                let elements = document.getElementsByClassName(className);
                
                for(let i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('active');
                }
            });
        });
    }

    init() {
        this.addEventListeners();
        this.fixDates();
    }
}