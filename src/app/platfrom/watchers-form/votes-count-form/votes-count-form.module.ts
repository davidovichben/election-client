import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesCountFormComponent } from './votes-count-form.component';
import { FormsModule } from "@angular/forms";
import { RouterModule , Routes} from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { CandidatesResolve } from "../../../_shared/reloves/candidates.resolve";
import { CandidateService } from "../../../_shared/services/http/candidate.service";
import { PartiesResolve } from "../../../_shared/reloves/parties.resolve";
import { PartyService } from "../../../_shared/services/http/party.service";
import {BallotService} from "../../../_shared/services/http/ballot.service";

const routes: Routes = [
  {
    path: '',
    resolve: {
      candidates: CandidatesResolve,
      parties: PartiesResolve
    },
    component: VotesCountFormComponent
  }
]

@NgModule({
  declarations: [
    VotesCountFormComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule
  ],
  providers: [CandidateService, CandidatesResolve, PartiesResolve, PartyService, BallotService]
})
export class VotesCountFormModule {}
