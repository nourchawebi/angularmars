import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationRequest} from "../models/authentication-request";
import {AuthenticationRespons} from "../models/authentication-response";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userPayload: any;
  constructor(private http: HttpClient) {
this.userPayload=this.decodedToken()
  }
  private jwtHelper: JwtHelperService=new JwtHelperService();
  private baseUrl: string ='http://localhost:8082/api/auth/login'
login(authRequest:AuthenticationRequest){
    return this.http.post<AuthenticationRespons>(`${this.baseUrl}`,authRequest) }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
  decodedToken(){
    const token=this.getToken()!;
    return this.jwtHelper.decodeToken(token);
  }
createAuthorization(){
    let authHeader= new HttpHeaders();
    const token= this.getToken();
    if(token){
      authHeader=authHeader.set('Authorization','Bearer'+token);
    }
    return authHeader;
}
private fullName$=new BehaviorSubject<string>("");
  private email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  private user$ = new BehaviorSubject<any | null>(null);
  public getUser()
  {
    return this.user$.asObservable()
  }
  public setUser(user:any){
    this.user$.next(user);
  }
  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }
  getLogedUser(){
    if(this.userPayload){
      return this.userPayload
    }
  }
}
