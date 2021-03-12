import { APIRoutes } from './utils';
import { tableSetup } from './init';

export const renderProcess = (process) => {
    let processes = document.getElementById('processes');
    let placeholders = document.getElementsByClassName('placeholder');
    let adminLevel = document.getElementById('admin_level').value;
    
    for(let i = 0; i < placeholders.length; i++) {
        placeholders[i].parentNode.removeChild(placeholders[i]);
    }

    let div = document.createElement('div');
    div.classList.add('process');
    div.id = 'p-' + process.Service.ProcessID;
    div.innerHTML = `
    <div class="process-body">
        <p><span>Process Label:</span><span>${process.Service.Label}</span></p>
        <p><span>Process ID:</span><span>${process.Service.ProcessID}</span></p>
        <p><span>Server Address:</span><span><a href="${process.Config.ServerAddr}" target="_blank">${process.Config.ServerAddr}</a></span></p>
        <p><span>Domain:</span><span><a href="${process.Config.Domain}" target="_blank">${process.Config.Domain}</a></span></p>
        <p><span>Started:</span><span>${formatDate(new Date(process.Service.Started))}</span></p>
    </div>

    <div class="process-footer">
        ${processFooter({ 
            adminLevel: parseInt(adminLevel), 
            pid: process.Service.ProcessID 
        })}
    </div>`;

    processes.appendChild(div);
    return null
}

export const renderAPIRoutes = () => {
    let apiContainer = document.getElementById('api-container');

    APIRoutes.forEach(el => {
        let div = document.createElement('div');
        div.classList.add('api-route');
        div.innerHTML = `
            <div>
                <span>${el.path}</span>
                <span>${el.method}</span>
            </div>
            <pre>${el.data != undefined ? JSON.stringify(el.data, null, 2) : 'No data required'}</pre>
        `

        apiContainer.appendChild(div);
    });
}


export const processFooter = (config) => {    
    return config.adminLevel >= 3 ? `    
    <a class="terminate" href="javascript:void(0)" onclick="stopSite(this)" data-pid="${config.pid}">Terminate</a>
    <a href="#">Restart</a>` : '';
}

export const renderAnalytics = (data) => {
    let container = document.getElementsByClassName('table-body')[0];

    data.forEach(row => {
        let div = document.createElement('div');
        div.className = 'table-row';
        div.innerHTML = `
            <span class="id">${row.id}</span>
            <span class="href">${row.href}</span>
            <span class="created">${row.created}</span>
            <span class="ip">${row.ip}</span>
        `
        container.appendChild(div);
    })

    tableSetup();
}