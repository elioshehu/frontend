import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order-frontend';

  constructor(private router: Router) {
  }

  ngOnInit(){
    if(localStorage.getItem("currentUser") === null){
      this.router.navigate(['login'])
    }
    else{
      this.router.navigate(['porosi'])
    }
  }
}
