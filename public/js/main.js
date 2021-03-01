const navigate = (element) => {
    return window.location.pathname = '/site/portal/page/' + 
    parseInt(element.getAttribute('data-id'));
}

const deletePage = (element) => { // requires a valid session or it will be rejected
    if(confirm('Confirm Delete Page ' + element.getAttribute('data-id'))) {
        return window.location.pathname = '/site/portal/page/' + 
        element.getAttribute('data-id') + '/delete';
    }
}

const navOnClick = (element) => {
    console.log(element);
}

(function() {
    try {
        return document.getElementById('archived').checked = 
        parseInt(document.getElementById('archived-hidden').textContent) === 1 
        ? true : false;

    } catch(err) {
        return console.log(new Error('Element could not be found'));
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
        return console.log(new Error('Element could not be found'));
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

const main = () => console.log('Page finished loading');