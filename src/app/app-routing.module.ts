import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProfileRegisterComponent } from './component/profile-register/profile-register.component';
import { ViewProfilesComponent } from './component/view-profiles/view-profiles.component';


const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"profile", component:ProfileRegisterComponent},
  {path:"viewProfiles", component:ViewProfilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
