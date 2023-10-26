import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-shites',
  templateUrl: './shites.component.html',
  styleUrls: ['./shites.component.css']
})
export class ShitesComponent {

  // ShitesForm = new FormGroup({
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   is_active: new FormControl(''),
  //   shitesID: new FormControl('')
  // })
  shitesFG: FormGroup = new FormGroup({})
  ShitesArray: any[] = [];

  username: string = "";
  email: string = "";
  password = "";
  is_active: boolean = true;
  shitesID = "";

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getAllShites();
    this.initShitesForm();
  }

  createShites() {
    // let data = {
    //   "username": this.username,
    //   "email": this.email,
    //   "password": this.password,
    //   "is_active": this.is_active
    // };
    this.http.post("http://127.0.0.1:8000/users/Shites", this.shitesFG.value).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses");
      // this.username = '';
      // this.email = '';
      // this.password = '';
      // this.is_active = true;
      this.getAllShites();
    });
  }

  getAllShites() {
    this.http.get("http://127.0.0.1:8000/users/Shites").subscribe((resultData: any) => {
      console.log(resultData)
      this.ShitesArray = resultData.results
    })
  }

  setUpdate(data: any) {
    // this.username = data.username
    // this.email = data.email
    // this.password = data.password
    // this.is_active = data.is_active
    // this.shitesID = data.id
    this.shitesFG.patchValue(data)
  }

  updateShites() {
    // let data = {
    //   "username": this.username,
    //   "email": this.email,
    //   "password": this.password,
    //   "is_active": this.is_active
    // }
    this.http.put("http://127.0.0.1:8000/users/ShitesUpdate/" + this.shitesFG.get("id")?.value, this.shitesFG.value).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      // this.username = '';
      // this.email = '';
      // this.password = '';
      // this.is_active = true;
      this.getAllShites();
    })
  }

  deleteShites(data: any) {
    this.http.delete("http://127.0.0.1:8000/usersUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllShites();
    })
  }

  initShitesForm(){
    this.shitesFG = this.fb.group({
      username: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      is_active: new FormControl(true),
      id: new FormControl(null),
    })
  }
}
