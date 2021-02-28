const toggleSidenav = () => {
    toggleElement('sidenav');
    toggleElement('navbar-btn');
    toggleElement('content-main');
    return null;
}

const toggleElement = (id) => {
    let element = document.getElementById(id);

    return element.classList.contains('open') ?
    element.classList.remove('open') :
    element.classList.add('open');
}