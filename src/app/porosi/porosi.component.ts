import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-porosi',
  templateUrl: './porosi.component.html',
  styleUrls: ['./porosi.component.css']
})
export class PorosiComponent {
  PorosiArray: any[] = [];
  ClientArray: any[] = []
  CreatorArray: any[] = []
  ProductArray: any[] = []

  customer: string = "";
  creator: string = "";
  units: any []= [];
  product: any = "";
  amount: number = 0;
  price: number = 0;
  porosiID = "";

  url = "http://127.0.0.1:8000/orders/"

  constructor(private http: HttpClient) {
    this.getAllPorosi(this.url);
    this.getAllClient()
    this.getAllCreator()
    this.getAllProduct()
  }

  createPorosi() {
    let data = {
      "customer": this.customer,
      "creator": this.creator,
      // "amount": this.amount,
      // "price": this.price
      "units": [this.product, this.amount, this.price]
    };
    this.http.post(this.url, data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses");
      this.getAllPorosi(this.url);
    });
  }

  getAllPorosi(url: string) {
    this.http.get(url).subscribe((resultData: any) => {
      console.log(resultData)
      if (this.PorosiArray === undefined) {
        this.PorosiArray = resultData.results
      } else {
        this.PorosiArray = this.PorosiArray.concat(resultData.results)
      }
      if (resultData.next != null) {
        this.getAllPorosi(resultData.next)
      }
    })
  }

  getAllClient() {
    this.http.get("http://127.0.0.1:8000/customers/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ClientArray = resultData.results
    })
  }

  getAllCreator() {
    this.http.get("http://127.0.0.1:8000/users/").subscribe((resultData: any) => {
      console.log(resultData)
      this.CreatorArray = resultData.results
    })
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log('products',resultData)
      this.ProductArray = resultData.results;
    })
  }

  setUpdate(data: any) {
    this.customer = data.customer
    this.creator = data.creator
    this.units = data.units
    this.amount = data.units.amount
    this.price = data.units.price
    this.porosiID = data.id
  }

  updatePorosi() {
    let data = {
      "customer": this.customer,
      "creator": this.creator,
      "units": this.units,
      "amount": this.amount,
      "price": this.price
    }
    this.http.put("http://127.0.0.1:8000/ordersUpdate/" + this.porosiID, data).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.customer = ''
      this.creator = ''
      this.units = []
      this.amount = 0
      this.price = 0
      this.getAllPorosi(this.url);
    })
  }

  deletePorosi(data: any) {
    this.http.delete("http://127.0.0.1:8000/ordersUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllPorosi(this.url);
    })
  }
}
