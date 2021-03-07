const tableSetup = () => {    
    let thead = document.getElementById('t-head');
    
    thead.childNodes.forEach(i => {
        i.addEventListener('mouseenter', (e) => {
            let className = e.target.textContent.replace(/\s/g, '').toLowerCase();
            let elements = document.getElementsByClassName(className);
            
            for(let i = 0; i < elements.length; i++) {
                elements[i].classList.add('active');
            }
        });

        i.addEventListener('mouseleave', (e) => {
            let className = e.target.textContent.replace(/\s/g, '').toLowerCase();
            let elements = document.getElementsByClassName(className);
            
            for(let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active');
            }
        });
    });

    fixTableDates();
}

const fixTableDates = () => {
    let dates = document.getElementsByClassName('created');
    for(let i = 0; i < dates.length; i++) {
        dates[i].textContent = moment(new Date(dates[i].textContent)).fromNow();
    }
}