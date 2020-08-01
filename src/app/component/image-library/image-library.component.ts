import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.css']
})
export class ImageLibraryComponent implements OnInit {

  imageBase64;
  croppedImage;
  showCropper: boolean = false;

  userImages: any[];
  imageChangedEvent: any = '';

  hideAddImageIcon: boolean = false;

  constructor(private profileService: ProfileService, private modalService: NgbModal, private imageCompressor: NgxImageCompressService) { }

  ngOnInit() {

    this.profileService.getUserImagesLibrary().subscribe((result: any) => {

      this.userImages = result;
      this.hideAddImageIcon = this.userImages.length >= 4;

    }, error => {
      console.log(error)
    })

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
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

  imageLoaded() {
    this.showCropper = true;
    // show cropper
  }

  uploadImage() {

    var formData: any = new FormData();

    formData.append("file", this.dataURItoBlob(this.croppedImage))

    this.profileService.saveUserLibraryImage(formData).subscribe(result => {
      this.profileService.getUserImagesLibrary().subscribe((result: any) => {

        this.userImages = result;
        this.hideAddImageIcon = this.userImages.length >= 4;


      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error);
    })

  }


  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        // this.closeResult = 'Closed with: $result';
      }, (reason) => {
        // this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        // this.closeResult = 'Closed with: $result';
      }, (reason) => {
        // this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        // this.closeResult = 'Closed with: $result';
      }, (reason) => {
        // this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

}
