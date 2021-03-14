import { 
    HTTPGetRequest,
    HTTPPostRequest,
    getServerAddr
} from './http';

import { ProcessesComponent } from '../components/processes';
import { errorHandler } from '../utils/utils';

export const signUpSubmit = () => {
    let form = document.getElementById('signUp-form');
    let formData = new FormData(form);
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    HTTPPostRequest(getServerAddr(false) + '/validate-form/sign-up', { email, username, password })
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

export const signInSubmit = () => {
    let form = document.getElementById('signIn-form');
    let formData = new FormData(form);
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    HTTPPostRequest(getServerAddr(false) + '/validate-form/sign-in', { username, password })
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

export const updatePostSubmit = () => {
    let data = {
        ID: parseInt(document.getElementById('post-id').textContent),
        Title: document.getElementById('title').value,
        Post: document.getElementById('body').value,
        Category: document.getElementById('category').value,
        ImageURL: document.getElementById('imageurl').value,
        Archived: document.getElementById('archived').checked ? 1 : 0
    }

    if(confirm('Confirm Update')) {
        HTTPPostRequest(getServerAddr(false) + '/site/main/post/' + data.ID, data)
        .then(response => {
            if(response.success) {
                return window.location.href = '/site/main' 
            } else {
                return errorHandler(response.message)
            }
        });
    }
}

export const deleteImageSubmit = (element) => {
    let imageID = element.getAttribute('data-id');
    let postID = element.getAttribute('data-postid');

    if(confirm('Confirm Delete Image: ' + imageID)) {
        return HTTPGetRequest(getServerAddr(false) + '/site/main/post/' + postID + '/' + imageID + '/remove-image')
        .then(response => response.success ? 
        window.location.reload() : errorHandler(response.message));
    }
}

export const deletePostSubmit = (element) => {
    let id = element.getAttribute('data-id');
    
    if(confirm('Confirm Delete Post ' + id)) {
        console.log('Delete Post..')
        return window.location.pathname = '/site/main/post/' + id + '/remove-post'
    }
}

export const startProcess = () => {
    let site = document.getElementById('server').value;

    return HTTPGetRequest(getServerAddr(false) + '/users/start/' + site)
    .then(response => {
        return response.success ? 
        new ProcessesComponent().render(response.data) : 
        errorHandler(response.message);
    });
}


export const deletePage = (element) => { // requires a valid session or it will be rejected
    if(confirm('Confirm Delete Page ' + element.getAttribute('data-id'))) {
        return window.location.pathname = '/site/portal/page/' + 
        element.getAttribute('data-id') + '/delete';
    }
}

export const stopProcess = (el) => {
    console.log(el);
    
    let pid = el.getAttribute('data-pid');

    if(confirm('Are you sure you wish to terminate process: ' + pid)) {
        return HTTPGetRequest(getServerAddr(false) + '/users/stop/' + pid)
        .then(response => {
            console.log(response);
            if(response.success) {
                let processes = document.getElementById('processes');
                processes.removeChild(document.getElementById('p-' + pid));
            }
        });
    }
}
