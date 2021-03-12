import { HTTPGetRequest, getServerAddr } from './http';
import { renderAnalytics } from './render';
import { fixTableDates } from './utils';

export const fetchAnalytics = () => 
    HTTPGetRequest('https://paste.isak-tech.tk/analytics/load/load_all')
    .then(res => res.success ? renderAnalytics(res.data) : console.log(res.message));


export const tableSetup = () => {    
    let thead = document.getElementById('t-head');
    
    thead.childNodes.forEach(i => {
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

    fixTableDates();
}

    
export const getProcesses = () => {
    return HTTPGetRequest(getServerAddr(false) + '/users/get-processes')
    .then(response => response.success && response.data != null ?
    response.data.map(p => renderProcess(p, p.Label)) : console.log('err'));
}