import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './component/login/login.component';
import {NavbarComponent} from './component/navbar/navbar.component'
import {SectionsModule} from './component/sections/sections.module'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NouisliderModule} from "ng2-nouislider";
import { SignupComponent } from './component/signup/signup.component'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileRegisterComponent } from './component/profile-register/profile-register.component';
import { TokenInterceptorService } from './tokenInterceptor';
import { BasicFormComponent } from './component/basic-form/basic-form.component';
import { PersonalFormComponent } from './component/personal-form/personal-form.component';
import { EducationalFormComponent } from './component/educational-form/educational-form.component';
import { ProfessionalFormComponent } from './component/professional-form/professional-form.component';
import { FamilyFormComponent } from './component/family-form/family-form.component';
import { MedicalFormComponent } from './component/medical-form/medical-form.component';
import { AdditionalFormComponent } from './component/additional-form/additional-form.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ProfilePicComponent } from './component/profile-pic/profile-pic.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbdModalContent } from './component/sections/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    ProfileRegisterComponent,
    BasicFormComponent,
    PersonalFormComponent,
    EducationalFormComponent,
    ProfessionalFormComponent,
    FamilyFormComponent,
    MedicalFormComponent,
    AdditionalFormComponent,
    ProfilePicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SectionsModule,
    NouisliderModule,
    HttpClientModule,
    NgxSpinnerModule,
    ImageCropperModule
  ],
  entryComponents: [NgbdModalContent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
