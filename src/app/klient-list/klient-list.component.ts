import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-klient-list',
  templateUrl: './klient-list.component.html',
  styleUrls: ['./klient-list.component.css']
})
export class KlientListComponent {
  ClientArray: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.getAllKlient();
  }

  getAllKlient() {
    this.http.get("http://127.0.0.1:8000/customers/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ClientArray = resultData.results
    })
  }

  deleteKlient(data: any) {
    this.http.delete("http://127.0.0.1:8000/customers/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllKlient();
    })
  }

  goTo(id: any){
    this.router.navigate([`../klient/${id}`])
  }
}
