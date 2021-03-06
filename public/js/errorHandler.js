const errorHandler = (error) => alert(error);

(function() {
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
})();