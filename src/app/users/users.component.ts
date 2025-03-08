import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title=" welcome user one ! "
  imageUrl="/assets/fleur.jpg"
  property: boolean =true
  onClick(){
    alert('Button clicked !');
  }
name='nour';
  isVisible=false;
  isActive=false;
items:string[]=["item1","item2","items3"];
  buttonClass:string ='red';

  toggleColor(){
    this.buttonClass=this.buttonClass==='red'?'blue': 'red';

  }
  color: string[]=['purple','blue','red','green','orange']
  currentColor: string = this.color[0];
  colorIndex: number=0;
  chnageColor(){
    this.colorIndex=(this.colorIndex +1)% this.color.length;
  this.currentColor=this.color[this.colorIndex]}

}
