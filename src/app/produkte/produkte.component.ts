import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-produkte',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})
export class ProdukteComponent {
  ProdukteArray: any[] = [];

  name: string = "";
  default_price: number = 0;
  description: string = "";
  produktID = "";

  constructor(private http: HttpClient) {
    this.getAllProduct();
  }

  createProduct() {
    let data = {
      "name": this.name,
      "default_price": this.default_price,
      "description": this.description 
    };
    this.http.post("http://127.0.0.1:8000/products/", data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses");
      this.getAllProduct();
    });
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ProdukteArray = resultData.results
    })
  }

  setUpdate(data: any) {
    this.name = data.name
    this.default_price = data.default_price
    this.description = data.description
    this.produktID = data.id
  }

  updateProduct() {
    let data = {
      "name": this.name,
      "default_price": this.default_price,
      "description": this.description
    }
    this.http.put("http://127.0.0.1:8000/productsUpdate/" + this.produktID, data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.name = '';
      this.default_price = 0;
      this.description = '';
      this.getAllProduct();
    })
  }

  deleteProduct(data: any) {
    this.http.delete("http://127.0.0.1:8000/productsUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllProduct();
    })
  }
}
