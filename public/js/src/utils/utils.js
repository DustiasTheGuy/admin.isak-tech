import { 
    deleteImageSubmit,
    deletePostSubmit,
    updatePostSubmit,
    deletePageSubmit
} from './submit';

export const navigate = (element) => 
    window.location.pathname = '/site/portal/page/' + 
    parseInt(element.getAttribute('data-id'));

export const errorHandler = (message, isErr) => {
    
    try {
        let alertsContainer = document.getElementsByClassName('alerts-container')[0];
        alertsContainer.parentElement.removeChild(alertsContainer);
    } catch(err) {
        console.log('Zero errors found');
    }

    let div = document.createElement('div');
    div.classList.add('alert-container');
    div.innerHTML = `
        <div class="${ isErr ? 'alert-error' : 'alert-success' }">
            <p>${message} <i class="fas ${ isErr ? 'fa-exclamation-triangle' : 'fa-check-square'}"></i></p>
        </div>
    `
    document.body.appendChild(div)
    closeAlertEvent();
    //setTimeout(() => document.body.removeChild(div), 5000);
};

export const formatDate = (date) => moment(date).fromNow();

export const toggleSidenav = () => {
    toggleElement('sidenav');
    toggleElement('navbar-btn');
    toggleElement('content-main');
    return;
}

export const initSidenav = () => {
    document.getElementById('navbar-btn')
    .addEventListener('click', () => toggleSidenav());
}

export const toggleElement = (id) => {
    let element = document.getElementById(id);

    return element.classList.contains('open') ?
    element.classList.remove('open') :
    element.classList.add('open');
}

export const timeSince = (time) => {
    switch (typeof time) {
        case 'number':
          break;
        case 'string':
          time = +new Date(time);
          break;
        case 'object':
          if (time.constructor === Date) time = time.getTime();
          break;
        default:
          time = +new Date();
      }

      var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      ];

      var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;
    
      if (seconds == 0) {
        return 'Just now'
      }

      if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
      }

      var i = 0, format;

      while (format = time_formats[i++])
        if (seconds < format[0]) {
          if (typeof format[2] == 'string')
            return format[list_choice];
          else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }

      return time;
}

export const activeLink = () => {
    let navLinks = document.getElementsByClassName('nav-link');
    
    for(let i = 0; i < navLinks.length; i++) {
        let isActive = navLinks[i].href === window.location.href;
        if(isActive) return navLinks[i].classList.add('active');
    }
}

export const closeAlertEvent = () => {
    try {
        let alerts = document.getElementsByClassName('alert-container');
        
        for(let i = 0; i < alerts.length; i++) {
            alerts[i].addEventListener('click', () => {
                alerts[i].style.display = 'none';
            });
        }

        window.history.replaceState(null, null, window.location.pathname);
        return;
    } catch(err) {
        return;
    }
}

export const archivedInitial = () => {
    try {
        return document.getElementById('archived').checked = 
        parseInt(document.getElementById('archived-hidden').textContent) === 1 
        ? true : false;
    
    } catch(err) {
        return;
    }
}

export const adminLevelInitial = () => {
    try {
        let adminLevel = document.getElementById('adminLevel').value;
        let select = document.getElementById('admin');
    
        for(let i = 0; i < select.length; i++) {
            if(select[i].value === adminLevel) {
                select[i].selected = true;
            }
        }
    } catch(err) {
        return;
    }
}

export const galleryItemInital = () => {
    try {
        let galleryItems = document.getElementsByClassName('gallery-item');
        
        for(let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].addEventListener('click', () => 
            deleteImageSubmit({
                id: galleryItems[i].getAttribute('data-id'),
                postid: galleryItems[i].getAttribute('data-postid')
            }))
        }

    } catch(err) {
        return;
    }
}

export const editPostInitial = () => {
    try {
        let deleteBtn = document.getElementById('delete');
        let saveBtn = document.getElementById('save');
    
        deleteBtn.addEventListener('click', () => 
        deletePostSubmit(deleteBtn.getAttribute('data-id')));
    
        saveBtn.addEventListener('click', () => 
        updatePostSubmit())

    } catch(err) {
        return;
    }
}

export const deletePageInitial = () => {
    try {
        let deleteBtns = document.getElementsByClassName('delete_page');
        
        for(let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', () => 
            deletePageSubmit(deleteBtns[i].getAttribute('data-id')));
        }

    } catch(err) {
        return;
    }
}