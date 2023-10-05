import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotersComponent } from 'src/app/platfrom/admin/voters/voters.component';
import { RouterModule, Routes } from "@angular/router";
import { DataTableModule } from "src/app/_shared/services/data-table/data-table.module";
import { VoterService} from "src/app/_shared/services/http/voter.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { UserSessionService } from "src/app/_shared/services/http/user-session.service";
import { MatChipsModule } from "@angular/material/chips";
import { StatsResolve } from "src/app/_shared/reloves/stats.resolve";
import { StatisticsModule } from "src/app/platfrom/admin/voters/statistics/statistics.module";

const routes: Routes = [
  {
    path: '',
    component: VotersComponent,
    resolve: {
      stats: StatsResolve,
    }
  },
  { path: 'form', loadChildren: () => import('src/app/platfrom/watchers-form/watchers-form.module').then(m => m.WatchersFormModule) },
  { path: 'upload', loadChildren: () => import('src/app/_shared/services/file-upload/file-upload.module').then(m => m.FileUploadModule) }
];
@NgModule({
  declarations: [
    VotersComponent
  ],
  exports: [
    VotersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatChipsModule,
    DataTableModule,
    StatisticsModule
  ],
  providers: [VoterService, HttpClient, UserSessionService, StatsResolve]
})
export class VotersModule { }
