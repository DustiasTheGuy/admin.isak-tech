import { http } from '../index';
import { errorHandler } from '../utils/utils';

export class ImagesComponent {

    constructor() {
        this.dropzone = document.getElementById('dropzone');
        this.input = document.getElementById('file-input');
        this.gallery = document.getElementsByClassName('gallery')[0];
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
    }

    upload(files) {
        let formData = new FormData();
        
        for(let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        console.log(formData);

        http.UPLOAD('/users/upload', formData)
        .then(res => {
            if(res.success) {
                res.data.forEach(imgData => {
                    let img = document.createElement('img');
                    img.src = imgData;
                    this.gallery.appendChild(img);
                });
            }

            return errorHandler(res.message, !res.success);
        });
    }
}