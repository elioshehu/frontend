import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-klient',
  templateUrl: './klient.component.html',
  styleUrls: ['./klient.component.css']
})
export class KlientComponent {
  ClientArray: any[] = [];

  first_name: string = "";
  last_name: string = "";
  company_name: string = "";
  klientID = "";

  constructor(private http: HttpClient) {
    this.getAllKlient();
  }

  createKlient() {
    let data = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "company_name": this.company_name
    };
    this.http.post("http://127.0.0.1:8000/customers/", data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses");
      this.getAllKlient();
    });
  }

  getAllKlient() {
    this.http.get("http://127.0.0.1:8000/customers/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ClientArray = resultData.results
    })
  }

  setUpdate(data: any) {
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.company_name = data.company_name
    this.klientID = data.id
  }

  updateKlient() {
    let data = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "company_name": this.company_name
    }
    this.http.put("http://127.0.0.1:8000/customers/" + this.klientID, data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.first_name = ''
      this.last_name = ''
      this.company_name = ''
      this.getAllKlient();
    })
  }

  deleteKlient(data: any) {
    this.http.delete("http://127.0.0.1:8000/customers/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllKlient();
    })
  }
}
