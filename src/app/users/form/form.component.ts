import { Component } from '@angular/core';
import { UserService } from '../../http/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  constructor(private userService: UserService, private router: Router) {}

  userId: string = '';
  user: any = null;
  voted: boolean = false;
  showNotFoundMessage: boolean = false;

  getUserDetails(): void {
    this.userService.getUser(+this.userId).then(response => {
      if (response) {
        this.user = response;
        this.showNotFoundMessage = false; // Reset the error message flag
      } else {
        this.user = null;
        this.showNotFoundMessage = true;
      }
    })

  }

  getStanceName(stance: string): string {
    switch (stance) {
      case 'supporter':
        return 'תומך';
      case 'opponent':
        return 'מתנגד';
      case 'undecided':
        return 'לא ידוע';
      default:
        return '';
    }
  }

  submitForm(): void {
    this.showNotFoundMessage = false;

    if (this.user) {
      const values = { isVoted: this.voted }
      this.userService.updateUser(this.user.id, values).then(() => {
        this.showNotFoundMessage = true;
        this.router.navigateByUrl('/users');
      });
    }
  }
}
