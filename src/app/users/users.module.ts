import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from "@angular/router";
import { DataTableModule } from "../services/data-table/data-table.module";
import { UserService} from "../http/services/user.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { UserSessionService } from "../http/services/user-session.service";
import { MatChipsModule } from "@angular/material/chips";
import { StatsResolve } from "../reloves/stats.resolve";
import { StatisticsModule } from "./statistics/statistics.module";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      stats: StatsResolve,
    }
  },
  { path: 'form', loadChildren: () => import('src/app/users/form/form.module').then(m => m.FormModule) },
  { path: 'upload', loadChildren: () => import('src/app/services/file-upload/file-upload.module').then(m => m.FileUploadModule) }
];
@NgModule({
  declarations: [
    UsersComponent
  ],
  exports: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatChipsModule,
    DataTableModule,
    StatisticsModule
  ],
  providers: [UserService, HttpClient, UserSessionService, StatsResolve]
})
export class UsersModule { }
