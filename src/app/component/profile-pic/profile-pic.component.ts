import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

 ngOnInit() {
  }

  @ViewChild(ImageCropperComponent, null) 
  imageCropper: ImageCropperComponent;

  showCropper:boolean=false;

  imageChangedEvent: any = '';
    croppedImage: any = '';
    
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
      this.showCropper=true;
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    crop(){
      setTimeout(function(){
        this.imageCropper.crop();
        this.showCropper=false;
       
      },1000)
     
    }

}
