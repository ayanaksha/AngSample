import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesTransaction } from './sales-transaction';
import { SalesUser } from '../authentication/sales-user';
import { Headers, Http } from '@angular/http';
import { SalesRelationManager } from './sales-relationship-manager';

@Injectable()
export class SalesService {

  onlineSalesEndPoint: string;
  private headers = new Headers({'Content-Type': 'application/json'});
  private salesTransactionDetails : SalesTransaction;
  private salesRelationManager : SalesRelationManager;
  private currentUserDetails : SalesUser;

  constructor(private httpClient: HttpClient, private http: Http) {
    this.onlineSalesEndPoint = 'http://onlinesalesservice.centralus.cloudapp.azure.com:8080/api/v1/online-sales-service';
  }

  transactionDetails(salesTransactionDetails){
    const url = this.onlineSalesEndPoint + "/submitTransaction ";
    return this.httpClient.post(url, salesTransactionDetails);
  }

  retrieveTransactionDetails(currentUserDetails){
    const url = this.onlineSalesEndPoint + "/retrieveTransactions ";
    return this.httpClient.post(url, currentUserDetails);
  }

  setSalesTransaction(value : SalesTransaction){
    this.salesTransactionDetails = value;
  }
  getSalesTransaction(){
    return this.salesTransactionDetails;
  }

  relationManagerApproval(salesRelationManager){
    const url = this.onlineSalesEndPoint + "/retrieveRMTransactions";
    return this.httpClient.post(url, salesRelationManager);

  }
  setSalesRelationManager(value : SalesRelationManager){
    this.salesRelationManager = value;
  }
  getSalesRelationManager(){
    return this.salesRelationManager;
  }

  approveTransaction(salesTransactionDetails){
    const url  = this.onlineSalesEndPoint + "/submitTransactionApproval"
    return this.httpClient.post(url,salesTransactionDetails);
  }

  submitPaidTransaction(salesTransactionDetails){
    const url  = this.onlineSalesEndPoint + "/submitPaidTransaction"
    return this.httpClient.post(url,salesTransactionDetails);
  }
  
}