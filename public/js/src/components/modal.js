import { http } from '../index';
import { errorHandler, timeSince } from '../utils/utils';

export class ModalComponent {

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBody = document.getElementsByClassName('modal-body')[0];
        this.data = {};

        document.getElementById('closeModal')
        .addEventListener('click', () => this.close());
    }

    open() {
        this.modal.classList.add('open');
        this.render();
    }

    close() {
        this.modal.classList.remove('open');
    }

    setData(data) {
        this.data = data;
    }

    deleteImage() {
        if(confirm('Are you sure you wish to delete image: ' + this.data.id)) {
            http.GET(`/site/main/post/${this.data.post_id}/${this.data.id}/remove-image`)
            .then(response => {
                if(response.success) {
                    return window.location.href = 
                    window.location.href = 
                    '?s=Removed image: ' + this.data.id;
                }

                return errorHandler(response.message, !response.success);
            });
        }
    }

    render() {
        this.modalBody.innerHTML = `
            <img src="${this.data.url}">
            <p>URL: ${this.data.url}</p>
            <p>ID: ${this.data.id}</p>
            <p>Created: ${timeSince(this.data.created)}</p>
            <p>Thumbnail: ${this.data.thumbnail}</p>
            <div class="actions">
                <a id="delete_btn" href="javascript:void(0)">Delete Image</a>
            </div>`

        document.getElementById('delete_btn')
        .addEventListener('click', () => this.deleteImage());
    }
}