import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produkte-list',
  templateUrl: './produkte-list.component.html',
  styleUrls: ['./produkte-list.component.css']
})
export class ProdukteListComponent {
  ProdukteArray: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.getAllProduct();
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ProdukteArray = resultData.results
    })
  }

  deleteProduct(data: any) {
    this.http.delete("http://127.0.0.1:8000/productsUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllProduct();
    })
  }

  goTo(id: any){
    this.router.navigate([`../produkte/${id}`])
  }
}
