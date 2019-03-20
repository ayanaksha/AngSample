import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { SalesUser } from '../../sales-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: SalesUser;
  errorMsg : string ='';
  jsonData: any;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.newUser = new SalesUser();
  }

  ngOnInit() {
  }

  /**
   * This method would authenticate the user and use the details in dashboard page.
   */
  loginUser() {
    this.authService.validateAndLogin(this.newUser).subscribe(
      data => {
        if(data['token']) {
          this.authService.setToken(data['token']);
          this.errorMsg = '';
          this.jsonData = data;
          if(this.jsonData['loggedInUser'] == null) {
            this.errorMsg = "Login unsuccessful. Please enter correct login credentials";
          } else {
              console.log();
              this.authService.setSalesUser(this.jsonData['loggedInUser']);
              if (this.jsonData['loggedInUser'].role == "user"){        
                this.router.navigate(['/onlinesales/dashboard']);
              } else if (this.jsonData['loggedInUser'].role == "relationmanager"){
                this.router.navigate(['/onlinesales/relationmanager']);
              }
          }
        } else{
            this.errorMsg = "Login unsuccessful. Please enter correct login credentials";
        }
      },
      error => {
        this.errorMsg="Login unsuccessful. Please contact service administrator.";}
      );
  }

}
