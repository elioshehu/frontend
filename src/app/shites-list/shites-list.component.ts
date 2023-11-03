import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shites-list',
  templateUrl: './shites-list.component.html',
  styleUrls: ['./shites-list.component.css']
})
export class ShitesListComponent {
  ShitesArray: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.getAllShites();
  }

  getAllShites() {
    this.http.get("http://127.0.0.1:8000/users/Shites").subscribe((resultData: any) => {
      console.log(resultData)
      this.ShitesArray = resultData.results
    })
  }

  goTo(id: any) {
    this.router.navigate([`../shites/${id}`])
  }
}
