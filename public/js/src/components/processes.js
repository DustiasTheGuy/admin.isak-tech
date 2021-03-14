import { timeSince } from '../utils/utils';
import { HTTPGetRequest, getServerAddr } from '../utils/http';
import { startProcess, stopProcess } from '../utils/submit';

export class ProcessesComponent  {

    constructor() {
        this.processes = document.getElementById('processes');
        this.placeholders = document.getElementsByClassName('placeholder');
        this.adminLevel = document.getElementById('admin_level').value;
    }

    init() {
        this.loadData();

        try {
            document.getElementsByClassName('btn-primary')[0]
            .addEventListener('click', () => startProcess());
        } catch(err) {
            console.log('Administration level too low');
        }
    }

    hookTerminateBtn() {
        let buttons = document.getElementsByClassName('terminate')
            
        for(let i = 0; i < buttons.length; i++) {
            console.log(buttons[i])
            buttons[i].addEventListener('click', () => stopProcess(buttons[i]));
        }
    }

    loadData() {
        return HTTPGetRequest(getServerAddr(false) + '/users/get-processes')
        .then(response => response.success && response.data != null ?
        response.data.map(p => this.render({ Service: p.Service, Config: p.Config })) : console.log('err'));
    }
    
    render(process) {      
        console.log(process);

        let div = document.createElement('div');
        div.classList.add('process');
        div.id = 'p-' + process.Service.ProcessID;
        div.innerHTML = `
        <div class="process-body">
            <p><span>Process Label:</span><span>${process.Service.Label}</span></p>
            <p><span>Process ID:</span><span>${process.Service.ProcessID}</span></p>
            <p><span>Server Address:</span><span><a href="${process.Config.ServerAddr}" target="_blank">${process.Config.ServerAddr}</a></span></p>
            <p><span>Domain:</span><span><a href="${process.Config.Domain}" target="_blank">${process.Config.Domain}</a></span></p>
            <p><span>Started:</span><span>${timeSince(new Date(process.Service.Started))}</span></p>
        </div>
    
        <div class="process-footer">
            ${this.processFooter({ 
                adminLevel: parseInt(this.adminLevel), 
                pid: process.Service.ProcessID 
            })}
        </div>`;
    
        this.processes.appendChild(div);
        this.hookTerminateBtn();
        return null
    }

    processFooter(config) {    
        return config.adminLevel >= 3 ? `    
        <a class="terminate" href="javascript:void(0)" data-pid="${config.pid}">Terminate</a>
        <a href="#">Restart</a>` : '';
    }
}
