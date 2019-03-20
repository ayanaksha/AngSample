import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesUser} from './sales-user'
import { Headers, Http } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthenticationService {

  onlineSalesEndPoint: string;
  token: string;
  private user: SalesUser;

  constructor(private httpClient: HttpClient, private http: Http) {
    this.onlineSalesEndPoint = 'http://onlinesalesservice.centralus.cloudapp.azure.com:8080/api/v1';
  }

  registerUser(newUser) {
    const url = this.onlineSalesEndPoint + "/online-sales-service/registerUser";
    return this.httpClient.post(url, newUser, {responseType: 'text'});
  }

  setToken(token: string) {
    return localStorage.setItem(TOKEN_NAME, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  deleteToken() {
    localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded =  jwt_decode(token);
    if(decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) {
      token = this.getToken();
    }
    if(!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if(date === undefined || date === null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
  
  validateAndLogin(newUser) {
    const url = this.onlineSalesEndPoint + "/login";
    return this.httpClient.post(url, newUser);
  }

  setSalesUser(value : SalesUser){
    this.user = value;
  }

  getSalesUser(){
    return this.user;
  }
  
}
