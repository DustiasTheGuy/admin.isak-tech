import { signInSubmit, signUpSubmit } from './utils/submit';
import { 
    initSidenav,
    activeLink, 
    closeAlertEvent, 
    formGroupInitial, 
    optionInital, 
    archivedInitial,
    adminLevelInitial
} from './utils/utils';
import { TableComponent } from './components/table';
import { APIComponent } from './components/api';
import { AnalyticsComponent } from './components/analytics';
import { ProcessesComponent } from './components/processes'; 


const init = () => {
    activeLink(); // set active class on nav list item
    closeAlertEvent(); // add an event listener to errors so then can be closed
    formGroupInitial(); // if <input> isn't empty add focused class to it's parent element
    optionInital(); // when editing an existing post, select the old value
    archivedInitial(); // when editing an existing post, set archived to the old value
    initSidenav();
    return null;
}

const main = () => {
    init();

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
        
        case window.location.pathname.match(/\/users\/edit_account\/.*/)[0]:
            return adminLevelInitial();

        case '/sign-in':
            return document.getElementsByClassName('btn-primary')[0]
            .addEventListener('click', () => signInSubmit());

        case '/sign-up':
            return document.getElementsByClassName('btn-primary')[0]
            .addEventListener('click', () => signUpSubmit());

        default: return;
    }
}

window.document.onload = main();
