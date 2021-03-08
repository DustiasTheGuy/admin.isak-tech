const main = () => {
    switch(window.location.pathname) {
        case '/users/management': return getProcesses();
        case '/site/paste/api': return renderAPIRoutes();
        case '/site/main': return tableSetup();
        case '/site/portal': return tableSetup();
        default: return console.log('No match');
    }
}