const openAccordion = (element) => {
    let accordion = 
    document.getElementById('accordion-' + 
    element.getAttribute('data-ref'))

    accordion.classList.contains('open') ? 
    accordion.classList.remove('open') : 
    accordion.classList.add('open');
}

