import { Component } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  protected readonly faSignOut = faSignOut;

  signOut() {
    sessionStorage.clear();
    window.location.reload();
  }
}
