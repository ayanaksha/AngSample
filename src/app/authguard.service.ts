import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';

import { AuthenticationService } from './modules/authentication/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private route: Router, private authService: AuthenticationService) {}

    canActivate() {
        if(!this.authService.isTokenExpired()) {
            return true;
        }
        this.route.navigate(['/login']);
        return false;
    }
}