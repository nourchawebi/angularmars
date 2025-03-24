import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

 export const authGuard:CanActivateFn=(route,state)=>{
  const router = inject(Router);
  const authService= inject(AuthService);
  const token = localStorage.getItem('token');
  if(! token){
    router.navigate(['login']);
    return false;
  }
  const user= authService.getLogedUser();
  var loggedUser='ADMIN'
   if(loggedUser==='USER') {
     return true;
   }
     else {
     router.navigate(['unauthorized']);
     return false;}

}
export const authGuardadmin:CanActivateFn=(route,state)=>{
  const router = inject(Router);
  const authService= inject(AuthService);
  const token = localStorage.getItem('token');
  if(! token){
    router.navigate(['login']);
    return false;
  }
  const user= authService.getLogedUser();
  var loggedUser='ADMIN'
  if(loggedUser==='ADMIN') {
    return true;
  }
  else {
    router.navigate(['unauthorized']);
    return false;}

}
