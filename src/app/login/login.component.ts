import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../models/authentication-request";
import {AuthenticationRespons} from "../models/authentication-response";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
authForm:FormGroup;
authRequest: AuthenticationRequest={};
authResponse: AuthenticationRespons= {}
  constructor(private authService: AuthService,private router:Router,
              private formBuilder:FormBuilder) {
  this.authForm=this.formBuilder.group({
    username:['',[Validators.required]],
    password:['',Validators.required]
  })
  }
  error:string="";
message:any='';
authenticate (){
  this.authRequest.username=this.authForm.get('username')?.value;
  this.authRequest.password=this.authForm.get('password')?.value;
  this.authService.login(this.authRequest).subscribe({
    next:(response)=>{
      this.authResponse=response;
      localStorage.setItem('token',response.accessToken as string);
      this.error="";
      const tokenPayload=this.authService.decodedToken();
    this.authService.setRoleForStore(tokenPayload.role);
    this.authService.setUser(tokenPayload.name)
      this.message="u will be redirected to  welcome page"
      const role="ADMIN";
    if (role == 'ADMIN'){
      this.router.navigate((['admin']))
    }else {
      this.router.navigate(['acceuil'])
    }

    },
    error: (error) => {
      if (error.status === 404) {
        this.error=error.error;

      }else
      if(error.status===403)
      {
        if (error.error === 'User disabled and token expired') {
          this.message="";
          this.error = 'User disabled and token expired';


        } else if (error.error === 'User disabled') {
          this.message="";
          this.error = 'User disabled';
        }} else {
        this.message="";
        this.error = 'Bad credentials';
      }
      console.error(error);
    }
  })
}
}
