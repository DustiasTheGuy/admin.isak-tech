import { timeSince } from '../utils/utils';

export class AccountComponent {
    init() {
        this.fixDates();
        this.fixAdminLevel();
    }
    
    fixDates() {
        let dates = document.getElementsByClassName('created');
        for(let i = 0; i < dates.length; i++) {
            dates[i].textContent = timeSince(new Date(dates[i].textContent));
        }
    }

    fixAdminLevel() {
        let tag = document.getElementById('adminLevel');
        switch(parseInt(tag.textContent)) {
            case 0: return tag.textContent = "View";
            case 1: return tag.textContent = "View, Edit";
            case 2: return tag.textContent = "View, Edit , Delete";
            case 3: return tag.textContent = "View, Edit, Delete, Servers, Accounts";
            default: return tag.textContent = "Error";
        }
    }
}