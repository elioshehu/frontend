import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-klient',
  templateUrl: './klient.component.html',
  styleUrls: ['./klient.component.css']
})
export class KlientComponent {
  clientFG: FormGroup = new FormGroup({})
  ClientArray: any[] = [];

  klientID?: number;
  update: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.initClientForm();
  }

  ngOnInit() {
    this.klientID = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (this.klientID) {
      this.update = true
      this.setUpdate(this.klientID)
    }
  }

  createKlient() {
    if(!this.update) {
      this.http.post("http://127.0.0.1:8000/customers/", this.clientFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses");
      });
    }
    else{
      this.http.put("http://127.0.0.1:8000/customers/" + this.clientFG.get("id")?.value, this.clientFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses")
      })
    }
  }

  setUpdate(id: any) {
    this.http.get(`http://127.0.0.1:8000/customers/${id}`).subscribe((resultData: any) => {
      this.clientFG.patchValue(resultData)
    })
  }

  initClientForm(){
    this.clientFG = this.fb.group({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      company_name: new FormControl(null),
      id: new FormControl(null)
    })
  }

  goTo(){
    let url = this.router.url.substring(0,this.router.url.indexOf("?"))
    this.router.navigateByUrl(url+"klientList")
  }

  resetForm(){
    this.clientFG.reset()
  }
}
