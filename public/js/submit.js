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