
const navigate = (element) => {
    return window.location.pathname = '/site/portal/page/' + 
    parseInt(element.getAttribute('data-id'));
}

(function() {
    try {
        return document.getElementById('archived').checked = 
        parseInt(document.getElementById('archived-hidden').textContent) === 1 
        ? true : false;

    } catch(err) {
        return;
    }
    
})();

(function() {
    try {
        let category = document.getElementById('post-category').textContent;
        let options = document.getElementsByTagName('option');
    
        for(let i = 0; i < options.length; i++) {
            if(options[i].value === category) 
            return options[i].selected = true;
        }

    } catch(err) {
        return;
    }
})();

(function() {
    let navLinks = document.getElementsByClassName('nav-link');
    
    for(let i = 0; i < navLinks.length; i++) {
        if(navLinks[i].getAttribute('href') === window.location.pathname) {
            return navLinks[i].classList.add('active-link');
        } 
    }
})();

const errorHandler = (error) => alert(error);

(function() {
    try {
        let alerts = document.getElementsByClassName('alert');
        
        for(let i = 0; i < alerts.length; i++) {
            alerts[i].addEventListener('click', () => {
                alerts[i].style.display = 'none';
            });
        }

        return null

    } catch(err) {
        return null
    }
})();

const formatDate = (date) => moment(date).fromNow();

//#region 
const formGroupFocusIn = (e) => 
    e.path[0].value.length >= 1 ? e.path[1].classList.add('focused') : '';

const formGroupFocusOut = (e) => 
    e.path[0].value.length <= 0 ? true : false;

(function() {
    let formGroups = document.getElementsByClassName('form-group');
    for(let i = 0; i < formGroups.length; i++) {

        formGroups[i].childNodes.forEach(el => {
            let isFormElement = 
            el.tagName === "INPUT" || 
            el.tagName === "SELECT" || 
            el.tagName === "TEXTAREA";

            if(isFormElement && el.value.length > 0) {
                formGroups[i].classList.add('focused');
            }
        });

        formGroups[i].addEventListener('focusin', (e) =>  e.path[1].classList.add('focused'));
        formGroups[i].addEventListener('focusout', (e) => formGroupFocusOut(e) ? e.path[1].classList.remove('focused') : '');
    }
})();
//#endregion