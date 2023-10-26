import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = "";
  password = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  login() {
    let data = {
      "username": this.username,
      "password": this.password
    }
    this.http.post("http://127.0.0.1:8000/login/", data).subscribe((resultData: any) => {
      console.log(resultData)
      localStorage.setItem("currentUser", JSON.stringify(resultData))
      alert('Sukses')
      this.router.navigate(['porosi'])
    })
  }
}
