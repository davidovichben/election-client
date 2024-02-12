import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallotsComponent } from './ballots.component';
import {RouterModule, Routes} from "@angular/router";
import {BallotResolve} from "../../../_shared/reloves/ballot.resolve";

const routes: Routes = [
  {
    resolve: {
      'ballots' : BallotResolve
    },
    path: '',
    component: BallotsComponent,
  }
]

@NgModule({
  declarations: [
    BallotsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [BallotResolve]
})
export class BallotsModule { }
