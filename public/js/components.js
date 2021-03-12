//#region 
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
//#endregion

//#region 
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
//#endregion

//#region 

const renderAnalytics = (data) => {
    /*
        <div class="table-row">
            <div class="actions">
              <a href="/site/main/post/{{ $post.ID }}/add-image"><i class="fas fa-images"></i></a>
              <a href="/site/main/post/{{ $post.ID }}"><i class="fas fa-cog"></i></a>
            </div>
  
            <span class="thumbnail span-image"><img src="{{ $post.ImageURL }}"></span>
            <span class="id">{{ $post.ID }}</span>
            <span class="title">{{ $post.Title}}</span>
            <span class="category">{{ $post.Category }}</span>
            <span class="created">{{ $post.Date }}</span>
            <span class="imageurl">{{ $post.ImageURL }}</span>
            <span class="totalimages text-center">{{ $post.TotalImages }}</span>
            <span class="archived text-center">{{ $post.Archived }}</span> 
  
        </div>
    */
    let container = document.getElementsByClassName('table-body')[0];

    data.forEach(row => {
        let div = document.createElement('div');
        div.className = 'table-row';
        div.innerHTML = `
            <span class="id">${row.id}</span>
            <span class="href">${row.href}</span>
            <span class="created">${row.created}</span>
            <span class="ip">${row.ip}</span>
        `

        container.appendChild(div);
    })

    tableSetup();
}

const fetchAnalytics = () => {
    HTTPGetRequest('https://paste.isak-tech.tk/analytics/load/load_all')
    .then(res => res.success ? renderAnalytics(res.data) : console.log(res.message));

}
//#endregion


//#region 
const processFooter = (config) => {
    console.log(config);
    
    return config.adminLevel >= 3 ? `    
    <a class="terminate" href="javascript:void(0)" onclick="stopSite(this)" data-pid="${config.pid}">Terminate</a>
    <a href="#">Restart</a>` : '';
}
//#endregion