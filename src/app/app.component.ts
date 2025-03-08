import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title:string = 'angualarsmars';
  buttonClass:string ='red';

  toggleColor(){
    this.buttonClass=this.buttonClass==='red'?'blue': 'red';

  }
}
