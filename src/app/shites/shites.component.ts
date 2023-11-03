import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shites',
  templateUrl: './shites.component.html',
  styleUrls: ['./shites.component.css']
})
export class ShitesComponent {
  shitesFG: FormGroup = new FormGroup({})
  ShitesArray: any[] = [];

  shitesID?: number;
  update: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.getAllShites();
    this.initShitesForm();
  }

  ngOnInit() {
    this.shitesID = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (this.shitesID) {
      this.update = true
      this.setUpdate(this.shitesID)
    }
  }

  createShites() {
    if(!this.update) {
      this.http.post("http://127.0.0.1:8000/users/Shites", this.shitesFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses");
        this.getAllShites();
      });
    }
    else{
      this.http.put("http://127.0.0.1:8000/users/ShitesUpdate/" + this.shitesFG.get("id")?.value, this.shitesFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses")
        this.getAllShites();
      })
    }
  }

  getAllShites() {
    this.http.get("http://127.0.0.1:8000/users/Shites").subscribe((resultData: any) => {
      console.log(resultData)
      this.ShitesArray = resultData.results
    })
  }

  setUpdate(id: number) {
    this.http.get(`http://127.0.0.1:8000/users/ShitesUpdate/${id}`).subscribe((resultData: any) => {
      this.shitesFG.patchValue(resultData)
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

  goTo(){
    let url = this.router.url.substring(0,this.router.url.indexOf("?"))
    this.router.navigateByUrl(url+"shitesList")
  }

  resetForm(){
    this.shitesFG.reset()
  }
}
