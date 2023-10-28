import { Injectable } from '@angular/core';
import { Route, CanLoad, Router } from '@angular/router';

import { UserSessionService } from 'src/app/_shared/services/http/user-session.service';

@Injectable()
export class UserGuard implements CanLoad {

  constructor(private userSession: UserSessionService, private router: Router) {}

  canLoad(route: Route): boolean {
    if (this.userSession.isLoggedIn() && !this.userSession.isAdmin()) {
      // this.router.navigate(['/watcher']);
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
