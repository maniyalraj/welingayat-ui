import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-library',
  templateUrl: './image-library.component.html',
  styleUrls: ['./image-library.component.css']
})
export class ImageLibraryComponent implements OnInit {

  imageBase64;
  croppedImage;
  showCropper: boolean = false;

  userImages: any[] = [];
  imageChangedEvent: any = '';

  hideAddImageIcon: boolean = false;
  imageUploading:boolean = false;

  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private imageCompressor: NgxImageCompressService,
    private imageService: ImageService) { }

  async ngOnInit() {

    this.userImages = await this.imageService.getLibraryImages();

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

  async uploadImage() {


    this.imageUploading = true;

    const file = this.dataURItoBlob(this.croppedImage);

    let downloadUrl = await this.imageService.uploadLibraryImage(file);

    this.userImages.push({imageUrl: downloadUrl});

    this.imageUploading = false;

  }

  async deleteImage(image)
  {
    await this.imageService.deleteLibraryImage(image);

    this.userImages.splice(this.userImages.indexOf(image),1);
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
