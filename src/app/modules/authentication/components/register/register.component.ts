import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { SalesUser } from '../../sales-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: SalesUser;
  errorMsg : string ='';
  jsonData: any;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.newUser = new SalesUser();
  }

  ngOnInit() {
  }

  /**
   * This method would reset all the input field in registration component.
   */
  resetInput() {
    this.newUser = new SalesUser();
  }

  /**
   * This method allow the user to register in our portal and persists this data to backend.
   */
  registerSalesUser(){
    this.authService.registerUser(this.newUser).subscribe(
    data => {
              this.errorMsg = '';
              this.jsonData = data;
              this.authService.setSalesUser(this.newUser);
              this.router.navigate(['/login']);
            },
     error => {
                this.errorMsg="Login unsuccessful. Please contact service administrator.";
    });
  }

}
