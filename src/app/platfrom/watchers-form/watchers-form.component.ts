import { Component } from '@angular/core';
import { VoterService } from 'src/app/_shared/services/http/voter.service';
import {Router} from "@angular/router";
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';

@Component({
  selector: 'app-watchers-form',
  templateUrl: './watchers-form.component.html',
  styleUrls: ['./watchers-form.component.css']
})
export class WatchersFormComponent {
  constructor(private userService: VoterService, private router: Router,
              private notification: NotificationService) {}

  keyword = '';
  user: any = null;
  voted = false;
  showNotFoundMessage = false;

  getUserDetails(): void {
    this.userService.getVoter(+this.keyword).then(response => {
      if (response) {
        this.user = response;
        this.showNotFoundMessage = false;
      } else {
        this.notification.error('מצביע לא נמצא בקלפי')
        this.user = null;
        this.showNotFoundMessage = true;
      }
    })
  }

  submitForm(): void {
    this.showNotFoundMessage = false;

    if (this.user) {
      const values = { isVoted: this.voted }
      this.userService.updateVoter(this.user.id, values).then(() => {
        this.showNotFoundMessage = true;
        this.router.navigateByUrl('/users');
      });
    }
  }

  signOut() {
    sessionStorage.clear();
    window.location.reload();
  }

  protected readonly faSignOut = faSignOut;
}
