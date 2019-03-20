import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './modules/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private authService: AuthenticationService) {}

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
  navbarOpen : boolean =  false;
  toggleNavbar(){
   this.navbarOpen = !this.navbarOpen;
  }

}