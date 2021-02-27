const toggleSidenav = () => {
    toggleElement('sidenav');
    toggleElement('navbar-btn');
    return;
}

const toggleElement = (id) => {
    let element = document.getElementById(id);

    element.classList.contains('open') ?
    element.classList.remove('open') :
    element.classList.add('open');
}