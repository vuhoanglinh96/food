import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.id_token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
