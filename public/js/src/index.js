import { signInSubmit, signUpSubmit } from './utils/submit';
import { activeLink } from './utils/utils';

import { TableComponent } from './components/table';
import { APIComponent } from './components/api';
import { AnalyticsComponent } from './components/analytics';
import { ProcessesComponent } from './components/processes'; 

const main = () => {
    console.log('Application Started..')
    activeLink();
    switch(window.location.pathname) {
        case '/users/management': 
            return new ProcessesComponent().init();
        
        case '/site/paste/api': 
            return new APIComponent().init();
        
        case '/site/main': 
            return new TableComponent().init();
        
        case '/site/portal': 
            return new TableComponent().init();
        
        case '/users/analytics': 
            return new AnalyticsComponent().init();
        
        case '/users/user_accounts': 
            return new TableComponent().init();
        
        case '/sign-in':
            return document.getElementsByClassName('btn-primary')[0]
            .addEventListener('click', (e) => signInSubmit());

        case '/sign-up':
            return document.getElementsByClassName('btn-primary')[0]
            .addEventListener('click', (e) => signUpSubmit());

        default: return console.log('No match');
    }
}

window.document.onload = main();
