import { Routes, RouterModule } from '@angular/router';
import { ProfileRegisterComponent } from './profile-register.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ProfileRegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRegisterComponentRoutingModule {
}
