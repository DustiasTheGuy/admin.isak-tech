const signUpSubmit = () => {
    const form = document.getElementById('signUp-form');
    const formData = new FormData(form);
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
    const form = document.getElementById('signIn-form');
    const formData = new FormData(form);
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
    const imageID = element.getAttribute('data-id');
    const postID = element.getAttribute('data-postid');

    if(confirm('Confirm Delete Image: ' + imageID)) {
        HTTPGetRequest('/site/main/remove-image/' + postID + '/' + imageID)
        .then(response => response.success ? 
        window.location.reload() : errorHandler(response.message));
    }
}

const deletePostSubmit = () => {
    console.log('Delete Post..')
}