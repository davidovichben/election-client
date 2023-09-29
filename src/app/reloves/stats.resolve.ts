import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {UserService} from "../http/services/user.service";

@Injectable()
export class StatsResolve implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve(snapshot: ActivatedRouteSnapshot) {
    return this.userService.getStats().then(response => response);
  }
}
