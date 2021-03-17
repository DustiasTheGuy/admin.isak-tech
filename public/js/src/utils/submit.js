import { errorHandler } from '../utils/utils';
import { http } from '../index';

export const signUpSubmit = () => {
    let form = document.getElementById('signUp-form');
    let formData = new FormData(form);
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    http.POST('/validate-form/sign-up', { email, username, password })
    .then(response => {
        console.log(response);

        if(response.success) {
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(response.message, true)
        }
    });
}

export const signInSubmit = () => {
    let form = document.getElementById('signIn-form');
    let formData = new FormData(form);
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    http.POST('/validate-form/sign-in', { username, password })
    .then(response => {
        if(response.success) {
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(response.message, true)
        }
    });
}

export const updatePostSubmit = () => {
    let data = {
        ID: parseInt(document.getElementById('post-id').textContent),
        Title: document.getElementById('title').value,
        Post: document.getElementById('body').value,
        Category: document.getElementById('category').value || 'Articles',
        Thumbnail: document.getElementById('thumbnail').value,
        Archived: document.getElementById('archived').checked ? 1 : 0
    }

    if(confirm('Confirm Update')) {
        http.POST('/site/main/post/' + data.ID, data)
        .then(response => {
            if(response.success) {
                return window.location.href = '/site/main?s=post has been updated'; 
            } else {
                return errorHandler(response.message, true);
            }
        });
    }
}

export const deleteImageSubmit = (config) => {
    try {
        if(confirm('Confirm Delete Image: ' + config.id)) {
            return http.GET('/site/main/post/' + config.postid + '/' + config.id + '/remove-image')
            .then(response => {
                if(response.success) {
                    errorHandler(response.message, false);
                    let img = document.querySelector(`[data-id='${config.id}']`)
                    img.parentElement.removeChild(img);
                    return;
                }

                errorHandler(response.message, true);
                return;
            });
        }

    } catch(err) {
        return;
    }
} 

export const deletePostSubmit = (id) => {
    if(confirm('Confirm Delete Post ' + id)) {
        return window.location.pathname = '/site/main/post/' + id + '/remove-post'
    }
}

export const deletePageSubmit = (id) => { // requires a valid session or it will be rejected
    if(confirm('Confirm Delete Page ' + id)) {
        return window.location.pathname = '/site/portal/page/' + 
        id + '/delete';
    }
}
