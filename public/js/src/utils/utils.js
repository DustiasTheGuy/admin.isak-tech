export const navigate = (element) => 
    window.location.pathname = '/site/portal/page/' + 
    parseInt(element.getAttribute('data-id'));

export const errorHandler = (error) => alert(error);

export const formatDate = (date) => moment(date).fromNow();

export const formGroupFocusIn = (e) => 
    e.path[0].value.length >= 1 ? e.path[1].classList.add('focused') : '';

export const formGroupFocusOut = (e) => 
    e.path[0].value.length <= 0 ? true : false;

export const toggleSidenav = () => {
    toggleElement('sidenav');
    toggleElement('navbar-btn');
    toggleElement('content-main');
    return null;
}

export const toggleElement = (id) => {
    let element = document.getElementById(id);

    return element.classList.contains('open') ?
    element.classList.remove('open') :
    element.classList.add('open');
}

export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export const activeLink = () => {
    let navLinks = document.getElementsByClassName('nav-link');
    
    for(let i = 0; i < navLinks.length; i++) {
        let isActive = navLinks[i].href === window.location.href;
        if(isActive) return navLinks[i].classList.add('active');
    }
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
