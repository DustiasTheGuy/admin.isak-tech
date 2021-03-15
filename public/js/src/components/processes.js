import { timeSince, errorHandler } from '../utils/utils';
import { HTTP } from '../utils/http';

let http = new HTTP(false);

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
            .addEventListener('click', () => this.startProcess());
        } catch(err) {
            console.log('Administration level too low');
        }
    }

    loadData() {
        return http.GET('/users/get-processes')
        .then(response => response.success && response.data != null ?
        response.data.map(p => this.render({ Service: p.Service, Config: p.Config })) : console.log('err'));
    }
    
    stopProcess(pid) {              
        if(confirm('Are you sure you wish to terminate process: ' + pid)) {
            return http.GET('/users/stop/' + pid)
            .then(response => {
                if(response.success) {
                    let processes = document.getElementById('processes');
                    processes.removeChild(document.getElementById('p-' + pid));
                }
            });
        }
    }

    startProcess() {
        let site = document.getElementById('server').value;

        return http.GET('/users/start/' + site)
        .then(response => {
            return response.success ? 
            this.render(response.data) : 
            errorHandler(response.message);
        });
    }

    render(process) {      
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

        document.getElementById('btn-' + process.Service.ProcessID)
        .addEventListener('click', () => 
        this.stopProcess(process.Service.ProcessID));

        return null
    }

    processFooter(config) {    
        return config.adminLevel >= 3 ? `    
        <a class="terminate" href="javascript:void(0)" id="btn-${config.pid}">Terminate</a>
        <a href="#">Restart</a>` : '';
    }
}
