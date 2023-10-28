import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchersFormComponent } from 'src/app/platfrom/watchers-form/watchers-form.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {VoterService} from "src/app/_shared/services/http/voter.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: WatchersFormComponent
  }
]

@NgModule({
  declarations: [
    WatchersFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [VoterService, HttpClient]
})
export class WatchersFormModule {}
