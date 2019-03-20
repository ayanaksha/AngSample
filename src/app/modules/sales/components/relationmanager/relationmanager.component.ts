import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../sales.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { SalesTransaction } from '../../sales-transaction';
import { SalesUser } from '../../../authentication/sales-user';

@Component({
  selector: 'app-relationmanager',
  templateUrl: './relationmanager.component.html',
  styleUrls: ['./relationmanager.component.css']
})
export class RelationmanagerComponent implements OnInit {

  setClickedRow : Function;
  errorMsg : string ='';
  jsonData: any;
  amount: string;
  projection: string; 
  result: number;
  salesTransactionDetailsArray: Array<SalesTransaction> = [];
  selectedSalesTransactionDetailsArray: Array<SalesTransaction> = [];
  salesTransactionDetails: SalesTransaction;
  currentUserDetails: SalesUser;

  constructor( private router: Router, private salesservice: SalesService, private authService : AuthenticationService ) {
    this.setClickedRow = function(event, i ){
      if(event.target.checked){
        this.salesTransactionDetailsArray[i].checkbox = true;
      } else {
        this.salesTransactionDetailsArray[i].checkbox = false;
      }
    }
   }

  ngOnInit() {
    this.currentUserDetails = this.authService.getSalesUser(); 
    this.salesservice.relationManagerApproval(this.currentUserDetails).subscribe(
      data => {
                this.errorMsg = '';
                this.jsonData = data;
                this.salesTransactionDetailsArray = this.jsonData;
                this.salesTransactionDetailsArray.map((data)=>{data.checkbox = false});
                this.router.navigate(['/onlinesales/relationmanager']);
              },
     error => {
                this.errorMsg = "You are un-authorised to view this page";});
  }

  /**
   * This methed would approve all the selected transaction and persists in backend.
   */
  approveAllTransaction(){
    this.selectedSalesTransactionDetailsArray = [];
    this.salesTransactionDetailsArray.forEach((eachObj, index) =>  {
        if(eachObj.checkbox){
          eachObj.status = "APPROVED";
          eachObj.approver = this.currentUserDetails.username;
          this.selectedSalesTransactionDetailsArray.push(eachObj);
        }
    });
    console.log("@@@@@@@@", this.selectedSalesTransactionDetailsArray );
    if(this.selectedSalesTransactionDetailsArray.length != 0) {
     this.salesservice.approveTransaction(this.selectedSalesTransactionDetailsArray).subscribe(
      data => {
                this.errorMsg = '';
                this.jsonData=data;
                this.salesservice.setSalesTransaction(this.salesTransactionDetails);
                this.salesTransactionDetailsArray = this.jsonData;
                this.salesTransactionDetailsArray.map((data)=>{data.checkbox = false});
                this.router.navigate(['/onlinesales/relationmanager']);
                },
       error => {
                this.errorMsg="You are un-authorised to approve these transactions";});
       } else {
         this.errorMsg = "Please select user sales transactions for approval/rejection.";
       }
   }

  /**
   * This methed would reject all the selected transaction and persists in backend.
   */
   rejectedAllTransaction() {
      this.selectedSalesTransactionDetailsArray = [];
      this.salesTransactionDetailsArray.forEach((eachObj, index) =>  {
          if(eachObj.checkbox){
            eachObj.status = "REJECTED";
            eachObj.approver = this.currentUserDetails.username;
            this.selectedSalesTransactionDetailsArray.push(eachObj);
          }
      });
      if(this.selectedSalesTransactionDetailsArray.length != 0) {
        this.salesservice.approveTransaction(this.selectedSalesTransactionDetailsArray).subscribe(
        data => {
                    this.errorMsg = '';
                    this.jsonData = data;
                    this.salesservice.setSalesTransaction(this.salesTransactionDetails);
                    this.salesTransactionDetailsArray = this.jsonData;
                    this.salesTransactionDetailsArray.map((data)=>{data.checkbox = false});
                    this.router.navigate(['/onlinesales/relationmanager']);
                  },
        error => {
                  this.errorMsg="You are not able to reject the request at this point of time";});
      } else {
        this.errorMsg = "Please select user sales transactions for approval/rejection.";
      }
    }

}