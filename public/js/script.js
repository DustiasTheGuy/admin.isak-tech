const signUpSubmit = () => {
    const form = document.getElementById('signUp-form');
    const formData = new FormData(form);
  

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    validateForm("http://localhost:8084/validate-form/sign-up", { email, username, password })
    .then(body => {
        console.log(body);

        if(body.success) {
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(body.message)
        }
    });
}


const signInSubmit = () => {
    const form = document.getElementById('signIn-form');
    const formData = new FormData(form);
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    validateForm("http://localhost:8084/validate-form/sign-in", { username, password })
    .then(body => {
        if(body.success) {
            formData.append('username', username);
            formData.append('password', password);
            return form.submit();
        } else {
            return errorHandler(body.message)
        }
    });
}


const validateForm = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json())
}

const errorHandler = (error) => {
    console.log(error);
}