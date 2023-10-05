import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserGuard } from 'src/app/_shared/guards/user.guard';
import { AdminGuard } from 'src/app/_shared/guards/admin.guard';
import { AccessDeniedComponent } from './platfrom/access-denied/access-denied.component';
import { UserSessionService } from 'src/app/_shared/services/http/user-session.service';
import { VoterService } from 'src/app/_shared/services/http/voter.service';
import { HttpClient } from '@angular/common/http';


const routes: Routes = [
  {
    path: 'watcher',
    loadChildren: () => import('src/app/platfrom/watchers-form/watchers-form.module').then(m => m.WatchersFormModule),
    canLoad: [UserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/platfrom/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/platfrom/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AdminGuard]
  },
  { path: '**', loadChildren: () => import('src/app/platfrom/login/login.module').then(m => m.LoginModule) },
]
@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    VoterService, HttpClient,
    NotificationService,
    UserSessionService,
    UserGuard,
    AdminGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
