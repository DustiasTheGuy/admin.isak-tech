const errorHandler = (error) => {
    console.log(error);
}

(function() {
    try {
        let alerts = document.getElementsByClassName('alert');
        
        for(let i = 0; i < alerts.length; i++) {
            alerts[i].addEventListener('click', () => {
                alerts[i].style.display = 'none';
            });
        }
        
    } catch(err) {
        console.log('Zero errors have occured')
    }
})();