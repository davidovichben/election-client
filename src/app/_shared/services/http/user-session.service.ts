import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { VoterModel } from 'src/app/_shared/models/voter.model';

@Injectable()
export class UserSessionService {

  loginChange: Subject<boolean> = new Subject();
  userUpdated: Subject<boolean> = new Subject();

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  setUser(user: VoterModel): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.loginChange.next(true);
  }

  unsetUser(): void {
    sessionStorage.removeItem('user');
    this.loginChange.next(false);
  }

  getUser(): any {
    if (sessionStorage.getItem('user')) {
      // @ts-ignore
      return JSON.parse(sessionStorage.getItem('user'));
    }

    return null;
  }

  getUserId(): any {
    const user = this.getUser();
    if (this.getUser()) {
      return user.id;
    }

    return null;
  }

  updateUser(property: string, value: any): void {
    const user = this.getUser();
    user[property] = value;
    this.setUser(user);

    this.userUpdated.next(true);
  }

  getToken(): string | null {
    if (sessionStorage.getItem('user')) {
      // @ts-ignore
      return JSON.parse(sessionStorage.getItem('token'));
    }

    return null;
  }

  setPermissions(permissions: any): void {
    const user = this.getUser();
    user.permissions = permissions;

    this.setUser(user);
  }

  setOrganization(organizationName: string): void {
    const user = this.getUser();
    user.organization = organizationName;

    this.setUser(user);
  }

  hasPermission(module: string, action: string): boolean {
    const user = this.getUser();
    if (!user) {
      return false;
    }

    const permissions = user.permissions;
    if (permissions === 'root') {
      return true;
    }

    return permissions[module] && permissions[module][action];
  }

  isAdmin(): boolean {
    return this.getUser().accessToken.name === 'admin';
  }
}
