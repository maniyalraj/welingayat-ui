import { NgModule } from '@angular/core';
import { ProfileRegisterComponentRoutingModule } from './profile-register-routing.module';
import { ProfileRegisterComponent } from './profile-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasicFormComponent } from '../basic-form/basic-form.component';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { EducationalFormComponent } from '../educational-form/educational-form.component';
import { ProfessionalFormComponent } from '../professional-form/professional-form.component';
import { FamilyFormComponent } from '../family-form/family-form.component';
import { MedicalFormComponent } from '../medical-form/medical-form.component';
import { AdditionalFormComponent } from '../additional-form/additional-form.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ProfileRegisterComponentRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    ImageCropperModule,
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    ProfileRegisterComponent,
    BasicFormComponent,
    PersonalFormComponent,
    EducationalFormComponent,
    ProfessionalFormComponent,
    FamilyFormComponent,
    MedicalFormComponent,
    AdditionalFormComponent,
  ],
  exports: [
    ProfileRegisterComponent
  ]
})
export class ProfileRegisterComponentModule {
}
