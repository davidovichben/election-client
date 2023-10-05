import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/http/user.service';
import { UserSessionService } from 'src/app/_shared/services/http/user-session.service';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router,
              private userService: UserService, private userSession: UserSessionService,
              private notification: NotificationService) {}

  onSubmit() {
    const { username, password } = this.user;

    this.userService.login(username, password).subscribe(
      (response) => {
          sessionStorage.setItem('user', JSON.stringify(response.user));
          sessionStorage.setItem('token', JSON.stringify(response.token));

          if (this.userSession.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/watcher']);
          }
        }
      ,
      (error) => {
        this.notification.error('שם משתמש או סיסמא לא נכונים.');
      }
    );
  }
}
