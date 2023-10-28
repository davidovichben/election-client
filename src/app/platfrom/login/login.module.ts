import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/platfrom/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'src/app/_shared/services/http/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserSessionService } from 'src/app/_shared/services/http/user-session.service';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, UserSessionService]
})
export class LoginModule { }
