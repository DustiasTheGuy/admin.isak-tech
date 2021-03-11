const activeLink = () => {
    let navLinks = document.getElementsByClassName('nav-link');
    
    for(let i = 0; i < navLinks.length; i++) {
        let isActive = navLinks[i].href === window.location.href;
        if(isActive) return navLinks[i].classList.add('active');
    }
}

const main = () => {
    console.log('Application Started..')
    activeLink();
    switch(window.location.pathname) {
        case '/users/management': return getProcesses();
        case '/site/paste/api': return renderAPIRoutes();
        case '/site/main': return tableSetup();
        case '/site/portal': return tableSetup();
        case '/users/analytics': return fetchAnalytics();
        default: return console.log('No match');
    }
}

window.document.onload = main();
