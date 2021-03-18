import { http } from '../index';
import { errorHandler } from '../utils/utils';
import { ModalComponent } from './modal';

export class ImagesComponent {

    constructor() {
        this.dropzone = document.getElementById('dropzone');
        this.input = document.getElementById('file-input');
        this.gallery = document.getElementsByClassName('gallery')[0];
        this.modal = new ModalComponent();
    }

    init() {
        this.dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzone.classList.add('highlight');
        });

        this.dropzone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzone.classList.remove('highlight');
        });

        this.dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzone.classList.remove('highlight');
            this.upload(e.dataTransfer.files);
        });

        this.input.addEventListener('change', (e) => 
        this.upload(e.target.files));

        this.addEventListeners();
    }

    isAllowed(type) {
        switch(type) {
            case 'image/jpeg': return true;
            case 'image/jpg':  return true;
            case 'image/png':  return true;
            case 'image/gif':  return true;
            default:           return false;
        }
    }

    addEventListeners() {
        let galleryItems = document.getElementsByClassName('gallery--item');

        for(let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].addEventListener('click', () => {
                this.modal.setData({
                    url: galleryItems[i].getAttribute('src'),
                    id: galleryItems[i].getAttribute('data-id'),
                    created: galleryItems[i].getAttribute('data-created'),
                    post_id: galleryItems[i].getAttribute('data-post_id'),
                    thumbnail: galleryItems[i].getAttribute('data-thumbnail')
                });

                this.modal.open();
            });
        }
    }

    isTooLarge(size) {
        return size / 1024 > 1000;
    }

    upload(files) {
        let formData = new FormData();
        let filesLength = 0;

        for(let i = 0; i < files.length; i++) {
            
            if(this.isTooLarge(files[i].size)) {
                errorHandler("File Too Large", true);
            } else if(filesLength >= 5) {
                errorHandler("Maximum Files Reached", true);
            } else if(this.isAllowed(files[i].type)) {
                formData.append('file', files[i]);
                filesLength++;
            } else {
                errorHandler("File Type Not Allowed", true);
            }
        }

        try {
            http.UPLOAD('/users/upload', formData)
            .then(res => { 
                if(res.success)
                return window.location.href = 
                       window.location.href = 
                       '?s=uploaded: ' + res.data.length + ' files';

                return errorHandler(res.message, !res.success);
            });

        } catch(err) {
            return;
        }
    }
}