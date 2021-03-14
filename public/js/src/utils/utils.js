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
    let adminLevel = document.getElementById('adminLevel').value;
    let select = document.getElementById('admin');

    for(let i = 0; i < select.length; i++) {
        if(select[i].value === adminLevel) {
            select[i].selected = true;
        }
    }
}

export const optionInital = () => {
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
}

export const formGroupInitial = () => {
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
}
