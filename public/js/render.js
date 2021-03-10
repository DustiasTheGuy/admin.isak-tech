//#region 
const renderProcess = (process) => {
    let processes = document.getElementById('processes');
    let placeholders = document.getElementsByClassName('placeholder');

    
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
        <a class="terminate" href="javascript:void(0)" onclick="stopSite(this)" data-pid="${process.Service.ProcessID}">Terminate</a>
        <a href="#">Restart</a>
    </div>`;

    processes.appendChild(div);
    return null
}
//#endregion

//#region 
const APIRoutes=[{path:"/api/posts",method:"GET",data:null},{path:"/api/post/:id",method:"GET",data:null},{path:"/api/paginate/:page/:limit",method:"GET",data:null},{path:"/api/delete",method:"DELETE",data:{id:"uint64"}},{path:"/api/new",method:"POST",data:{title:"string",body:"string",tags:"[]string"}},{path:"/api/update",method:"PUT",data:{id:"uint64",title:"string",body:"string",tags:"[]string"}}];

const renderAPIRoutes = () => {
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
    })
}
//#endregion
