import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/_shared/services/http/user.service';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';

@Component({
  selector: 'app-watchers-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  user: { password: string; username: string, ballotNumber: string } = {
    username: '',
    password: '',
    ballotNumber: '',
  };

  constructor(private userService: UserService, private notifications: NotificationService,
              private router: Router) {}

  onSubmit() {
    this.userService.checkExists(this.user.username).then(response => {
      if (response.exists) {
        this.notifications.error('משתמש קיים בארגון זה');
      } else {
        this.saveUser();
      }
    })
  }

  saveUser() {
    this.userService.newUser(this.user).subscribe(
      () => {
        this.notifications.success('משתמש נוצר בהצלחה');
        this.router.navigate(['/admin/users']);
      }
    );
  }
}
