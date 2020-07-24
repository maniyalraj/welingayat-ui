import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/service/profile.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

import { appConstats } from '../../constants';

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.css']
})
export class ProfileRegisterComponent implements OnInit {


  firstName: String;
  lastName: String;

  closeResult: string;

  initialRotate: number = 0;

  userImagePresent: boolean = false;
  profileImageUrl: String = "";

  imageBase64: any = appConstats.blankProfilePicBase64;

  @ViewChild('imgCropper', { read: ImageCropperComponent, static: true })
  imageCropper: ImageCropperComponent;

  @ViewChild('classic3', null)
  modal: NgbModal;


  showCropper: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/blank-profile-picture.png';

  uploadAndCompress() {
    this.imageCompressor.uploadFile().then(({ image, orientation }) => {

      // this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompressor.byteCount(image));

      this.imageCompressor.compressFile(image, orientation, 75, 50).then(
        result => {
          // console.log(result);
          this.imageLoaded()
          this.imageBase64 = result;
          // this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompressor.byteCount(result));
        }
      );

    });
  }

  fileChangeEvent(event: any): void {
    // this.imageChangedEvent = event;

  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  crop() {
    this.imageCropper.crop();
    this.showCropper = false;
    this.modalService.dismissAll();
  }

  rotate() {
    this.initialRotate += 1;
    this.imageCropper.transform = { 'rotate': this.initialRotate }
  }

  constructor(private profileService: ProfileService, private modalService: NgbModal, private imageCompressor: NgxImageCompressService) {
    console.log("loaded");
  }

  ngOnInit() {
    this.profileService.getUserBasicDetails().subscribe(result => {
      console.log(result);
      this.firstName = result["firstName"];
      this.lastName = result["lastName"];
    }, error => {
      // alert("Some error occured: "+error)
    })

    this.profileService.getUserProfileUrl().subscribe(result => {

      if (result["imageUrl"] == "" || result["imageUrl"] == null) {
        this.userImagePresent = false;
      }
      else {
        this.userImagePresent = false;
        this.profileImageUrl = result["imageUrl"];
      }

    }, error => {
      console.log(error);
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
      this.modalService.open(content, { centered: true }).result.then((result) => {
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
      return 'with: $reason';
    }


  }

  private dataURItoBlob(dataURI) {
    dataURI = dataURI.split(",")[1];
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  private uploadImage() {

    var formData: any = new FormData();

    formData.append("file", this.dataURItoBlob(this.croppedImage))

    this.profileService.saveUserProfileImage(formData).subscribe(result => {
      this.profileImageUrl = result["message"]
      console.log(result);
      this.modal.dismissAll();
    }, error => {
      console.log(error);
    })

  }


}
