const signUpSubmit = () => {
    let form = document.getElementById('signUp-form');
    let formData = new FormData(form);
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    HTTPPostRequest('/validate-form/sign-up', { email, username, password })
    .then(response => {
        console.log(response);

        if(response.success) {
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(response.message)
        }
    });
}


const signInSubmit = () => {
    let form = document.getElementById('signIn-form');
    let formData = new FormData(form);
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    HTTPPostRequest('/validate-form/sign-in', { username, password })
    .then(response => {
        if(response.success) {
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(response.message)
        }
    });
}

const updatePostSubmit = () => {
    let data = {
        ID: parseInt(document.getElementById('post-id').textContent),
        Title: document.getElementById('title').value,
        Post: document.getElementById('body').value,
        Category: document.getElementById('category').value,
        ImageURL: document.getElementById('imageurl').value,
        Archived: document.getElementById('archived').checked ? 1 : 0
    }

    if(confirm('Confirm Update')) {
        HTTPPostRequest('/site/main/post/' + data.ID, data)
        .then(response => {
            if(response.success) {
                return window.location.href = '/site/main' 
            } else {
                return errorHandler(response.message)
            }
        });
    }
}

const deleteImageSubmit = (element) => {
    let imageID = element.getAttribute('data-id');
    let postID = element.getAttribute('data-postid');

    if(confirm('Confirm Delete Image: ' + imageID)) {
        return HTTPGetRequest('/site/main/post/' + postID + '/' + imageID + '/remove-image')
        .then(response => response.success ? 
        window.location.reload() : errorHandler(response.message));
    }
}

const deletePostSubmit = (element) => {
    let id = element.getAttribute('data-id');
    
    if(confirm('Confirm Delete Post ' + id)) {
        console.log('Delete Post..')
        return window.location.pathname = '/site/main/post/' + id + '/remove-post'
    }
}

const startSite = () => {
    let site = document.getElementById('server').value;

    return HTTPGetRequest('/users/start/' + site)
    .then(response => {
        return response.success ? 
        renderProcess(response.data, site) : 
        errorHandler(response.message);
    });
}

const renderProcess = (process, site) => {
    console.log(process)
    let processes = document.getElementById('processes');

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

/*
    type Process struct {
        Service *service.Service
        Config  *processConfig
    }
*/

const stopSite = (el) => {
    let pid = el.getAttribute('data-pid');

    if(confirm('Are you sure you wish to terminate process: ' + pid)) {
        return HTTPGetRequest('/users/stop/' + pid)
        .then(response => {
            console.log(response);
            if(response.success) {
                let processes = document.getElementById('processes');
                processes.removeChild(document.getElementById('p-' + pid));
            }
        });
    }
}

const getProcesses = () => {
    return HTTPGetRequest('/users/get-processes')
    .then(response => response.success && response.data != null ?
    response.data.map(p => renderProcess(p, p.Label)) : console.log('err'));
}

const formatDate = (date) => moment(date).fromNow();