const openAccordion = (element) => {
    let id = element.getAttribute('data-ref');
    let accordion = document.getElementById('accordion-' + id);
    changeIcon(document.getElementById('icon-' + id));

    return accordion.classList.contains('open') ? 
    accordion.classList.remove('open') : 
    accordion.classList.add('open');
}

const changeIcon = (element) => {
    return element.classList.contains('rotated') ?
    element.classList.remove('rotated') :
    element.classList.add('rotated');
}