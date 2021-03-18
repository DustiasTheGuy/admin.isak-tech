import { HTTP } from './utils/http';
import { APIComponent } from './components/api';
import { TableComponent } from './components/table';
import { ImagesComponent } from './components/images';
import { AnalyticsComponent } from './components/analytics';
import { ProcessesComponent } from './components/processes'; 
import { AccountComponent } from './components/account';
import { signInSubmit, signUpSubmit } from './utils/submit';

import {
    initSidenav,
    activeLink, 
    archivedInitial,
    adminLevelInitial,
    galleryItemInital,
    editPostInitial,
    deletePageInitial,
    closeAlertInitial
} from './utils/utils';

export const http = new HTTP(false); // create new http instance that can be used by components/utils

const init = () => {
    activeLink(); // set active class on nav list item
    initSidenav(); // add event listeners to the open/close btn on sidenav
    adminLevelInitial(); // change the admin level input value based on what the server has sent
    archivedInitial(); // when editing an existing post, set archived to the old value
    galleryItemInital(); // add event listener to gallery items so they can be removed
    editPostInitial(); // add event listeners to delete/update buttons
    deletePageInitial(); // add event listeners to the delete buttons
    closeAlertInitial();
}

const main = () => {
    init();

    switch(window.location.pathname) {
        case '/users/management': return new ProcessesComponent().init();
        case '/site/paste/api': return new APIComponent().init();
        case '/site/main': return new TableComponent().init();
        case '/users/user_accounts': return new TableComponent().init();
        case '/site/portal': return new TableComponent().init();
        case '/users/analytics': return new AnalyticsComponent().init();
        case '/users/account': return new AccountComponent().init();
        case '/users/images': return new ImagesComponent().init();
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
