import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
// import { ProfileRegisterComponent } from './component/profile-register/profile-register.component';
import { ViewProfilesComponent } from './component/view-profiles/view-profiles.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { FavouritesComponent } from './component/favourites/favourites.component';
import { AdminComponent } from './component/admin/admin.component';


const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {
    path:"profile",
    loadChildren: () => import('./component/profile-register/profile-register.module').then(m=>m.ProfileRegisterComponentModule)
  },
  {path:"viewProfiles", component:ViewProfilesComponent},
  {path:"userProfile/:id", component:UserProfileComponent},
  {path:"favourites", component: FavouritesComponent},
  {path:"admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
