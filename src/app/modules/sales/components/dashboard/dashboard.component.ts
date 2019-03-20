import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesTransaction } from '../../sales-transaction';
import { SalesUser } from '../../../authentication/sales-user';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  salesTransactionDetails : SalesTransaction
  errorMsg : string ='';
  jsonData: any;
  currentUserDetails : SalesUser
  userTransactionDetails: Array<any> = [];
  persistArray: Array<SalesTransaction> = [];
  public isValidForm: boolean = false;
  selectedRow : Number;

  constructor( private salesservice: SalesService  , private router: Router, private authService : AuthenticationService) {
     this.salesTransactionDetails = new SalesTransaction();
  }

  ngOnInit() {
     this.currentUserDetails = this.authService.getSalesUser(); 
     this.salesTransactionDetails.requestedBy = this.currentUserDetails.userEmailId;
     this.userTransactionDetails.map((data)=>{data.checkbox = false});

     this.salesservice.retrieveTransactionDetails(this.currentUserDetails).subscribe(
       data => {
       this.errorMsg='';
       this.jsonData=data;
      this.salesservice.setSalesTransaction(this.salesTransactionDetails);
      this.userTransactionDetails = this.jsonData;
                  this.router.navigate(['/onlinesales/dashboard']);
               },
      error => {
        this.errorMsg="sales transaction Details";});
   
  }

  /**
   * This method reset the input fields in dashboard Component.
   */
  resetInput(){
    this.salesTransactionDetails = new SalesTransaction();
     this.salesTransactionDetails.requestedBy = this.currentUserDetails.userEmailId;
    this.router.navigate(['/onlinesales/dashboard']);
  }

  /**
   * This method checks the field value and call the calculateAmount() method.
   */
  validationForInputAmount(){
    if(this.salesTransactionDetails.amount != null && this.salesTransactionDetails.projectionType != null){
      this.isValidForm = true;
    }
    this.calculateAmount();
  }

  /**
   * This method checks the field value and call the calculateAmount() method.
   */
  validationForInputProjectionType(){
    if(this.salesTransactionDetails.projectionType != null){
      this.isValidForm = true;
    }
    this.calculateAmount();
  }

  /**
   * This method calculate the total amount depending on the given amount and selected projectiontype.
   */
  calculateAmount(){
    if(this.salesTransactionDetails.projectionType == "Silver Plan") { 
      this.salesTransactionDetails.projectionAmount = parseInt(this.salesTransactionDetails.amount) * 10;
    } else if(this.salesTransactionDetails.projectionType == "Gold Plan") { 
      this.salesTransactionDetails.projectionAmount = parseInt(this.salesTransactionDetails.amount) * 20;
    } else if(this.salesTransactionDetails.projectionType == "Platinum Plan") { 
      this.salesTransactionDetails.projectionAmount = parseInt(this.salesTransactionDetails.amount) * 30;
    } else if(this.salesTransactionDetails.projectionType == "Child Education Plan") { 
      this.salesTransactionDetails.projectionAmount = parseInt(this.salesTransactionDetails.amount) * 40;
    } else if(this.salesTransactionDetails.projectionType == "Pension Plan") { 
      this.salesTransactionDetails.projectionAmount = parseInt(this.salesTransactionDetails.amount) * 50;
    }
  }

  /**
   * This method persists the sales transaction details to backend and displays it on GUI.
   */
  submitInvestementPlan(){
    if(this.salesTransactionDetails.amount != null && this.salesTransactionDetails.projectionType != null && this.salesTransactionDetails.projectionType != "") {
      this.salesservice.transactionDetails(this.salesTransactionDetails).subscribe(
      data => {
              this.errorMsg='';
              this.jsonData=data;
              this.salesservice.setSalesTransaction(this.salesTransactionDetails);
              this.userTransactionDetails = this.jsonData;
              this.router.navigate(['/onlinesales/dashboard']);
              },
      error => {
              this.errorMsg="Issue in persisting sales transaction details";
            });
    } else {
        this.errorMsg="No sales investment/transaction of users selected for Approval/Rejection";
    }
  }

  /**
   * This method changes the status to paid for specific transaction and persisits in backend.
   */
  paymentForTransaction(value){
    value.status = "PAID";
    this.salesservice.submitPaidTransaction(value).subscribe(
      data => {
        this.errorMsg='';
        this.jsonData=data;
        this.salesservice.setSalesTransaction(this.salesTransactionDetails);
        this.userTransactionDetails = this.jsonData;
      },
      error => {
        this.errorMsg="Payment unsuccessful";
      });
  }
}
 
