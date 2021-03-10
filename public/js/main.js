const main = () => {
    console.log('Application Started..')
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

// (function() {
//     let elements = document.getElementsByClassName('created')
    
//     for(let i = 0; i < elements.length; i++) {
//         elements[i].textContent = 
//         formatDate(new Date(elements[i].textContent));
//     }
// })();