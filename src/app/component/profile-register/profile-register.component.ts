import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/service/profile.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

import { appConstats } from '../../constants';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ImageService } from 'src/app/service/image.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  userImagePresent: boolean = true;
  profileImageUrl: String = "";

  imageBase64: any = appConstats.blankProfilePicBase64;

  @ViewChild('imgCropper', { read: ImageCropperComponent, static: true })
  imageCropper: ImageCropperComponent;

  @ViewChild('classic3', null)
  modal: NgbModal;


  showCropper: boolean = false;

  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/blank-profile-picture.png';


  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private imageCompressor: NgxImageCompressService,
    private userService: UserServiceService,
    private imageService: ImageService) {

  }

  ngOnInit() {

    let user = this.userService.getCurrentUser();

    if (user && !user.profileImageUrl && user.photoURL) {

      user.profileImageUrl = user.photoURL;
      this.profileImageUrl = user.photoURL;
      // this.userService.setCurrentUser(user);
    }

    this.profileImageUrl = user.profileImageUrl;

    this.firstName = user.firstName;
    this.lastName = user.lastName;

  }

  uploadAndCompress() {
    this.imageCompressor.uploadFile().then(({ image, orientation }) => {

      // this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompressor.byteCount(image));

      this.imageCompressor.compressFile(image, orientation, 75, 50).then(
        result => {
          this.imageLoaded()
          this.imageBase64 = result;
          console.warn('Size in bytes is now:', this.imageCompressor.byteCount(result));
        }
      );

    }).catch(error => {
      alert(error);
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
    alert("Failed loading image");
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

  open(content, type, modalDimension) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = 'Closed with: $result';
    }, (reason) => {
      console.log(reason);
    });

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

  async uploadImage() {

    this.spinner.show('saving');

    const image = this.dataURItoBlob(this.croppedImage)

    this.profileImageUrl = await this.imageService.uploadProfileImage(image);

    this.imageBase64 = appConstats.blankProfilePicBase64;

    this.spinner.hide('saving');


  }


}
