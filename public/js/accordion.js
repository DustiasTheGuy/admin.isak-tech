const openAccordion = (element) => {
    resetAccordions();

    let accordion = 
    document.getElementById('accordion-' + 
    element.getAttribute('data-ref'))

    accordion.classList.contains('open') ? 
    accordion.classList.remove('open') : 
    accordion.classList.add('open');
}

const resetAccordions = (cb) => {
    let list = document.getElementsByClassName('accordion-item');

    for (let el of list) {
        el.classList.remove('open');
    }
}