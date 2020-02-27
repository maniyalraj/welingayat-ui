import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/service/profile.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.css']
})
export class ProfileRegisterComponent implements OnInit {
  

  firstName: String;
  lastName: String;

  closeResult: string;

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
      
      this.imageCropper.crop();
      this.showCropper=false;
      this.modalService.dismissAll();
     
    }

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  ngOnInit() {
    this.profileService.getUserBasicDetails().subscribe(result=>{
        console.log(result);
        this.firstName=result["firstName"];
        this.lastName=result["lastName"];
    },error=>{
      // alert("Some error occured: "+error)
    })
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    }
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  'with: $reason';
    }
}

  
}
