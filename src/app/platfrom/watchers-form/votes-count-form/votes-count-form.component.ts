import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BallotService} from "../../../_shared/services/http/ballot.service";
import {NotificationService} from "../../../_shared/services/generic/notification.service";

@Component({
  selector: 'app-votes-count-form',
  templateUrl: './votes-count-form.component.html',
  styleUrls: ['./votes-count-form.component.css']
})
export class VotesCountFormComponent {
  formData: any = {};

  partiesSelect: any[] = [];

  candidatesSelect: any[] = [];

  constructor(private router: ActivatedRoute, private ballotService: BallotService,
              private notifications: NotificationService) {}

  ngOnInit() {
    // @ts-ignore
    this.partiesSelect = this.router.snapshot.data.parties;
    // @ts-ignore
    this.candidatesSelect = this.router.snapshot.data.candidates;
  }
  submitForm(entity: 'candidate'|'party') {
    const values = {
      entity,
      value: this.formData[entity + 'Id']
    };

    this.ballotService.addVotes(values).then(response => {
      this.notifications.success('הצבעה נרשמה בהצלחה');
      this.formData[entity + 'Id'] = null;
    })
  }

  // reverseLastAction() {
  //   this.ballotService.addVotes(this.formData).then(response => {
  //     this.notifications.success('הצבעה בוטלה בהצלחה');
  //   })
  // }
}
