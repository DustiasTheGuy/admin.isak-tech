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

    isAllowed(type) {
        switch(type) {
            case 'image/jpeg': return true;
            case 'image/jpg':  return true;
            case 'image/png': return true;
            case 'image/gif':  return true;
            default:           return false;
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
                console.log(res);
                
                if(res.success) {
                    res.data.forEach(imgData => {
                        let img = document.createElement('img');
                        img.src = imgData;
                        this.gallery.appendChild(img);
                    });
                }
    
                return errorHandler(res.message, !res.success);
            });

        } catch(err) {
            console.log(err);
        }
    }
}