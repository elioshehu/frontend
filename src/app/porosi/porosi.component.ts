import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-porosi',
  templateUrl: './porosi.component.html',
  styleUrls: ['./porosi.component.css']
})
export class PorosiComponent {

  orderFG: FormGroup = new FormGroup({})
  orderArray: any[] = [];
  clientArray: any[] = []
  creatorArray: any[] = []
  productArray: any[] = []

  customer: string = "";
  creator: string = "";
  // units: any [] = [];
  product: any = "";
  amount: number = 0;
  price: number = 0;
  porosiID = "";

  url = "http://127.0.0.1:8000/orders/"

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getAllPorosi(this.url);
    this.getAllClient()
    this.getAllCreator()
    this.getAllProduct()
    this.initOrderForm()
  }

  getUnitsFA() {
    return this.orderFG.controls['units'] as FormArray
  }

  addUnits() {
    this.getUnitsFA().push(this.initUnitFG())
  }

  removeUnits(index: number) {
    this.getUnitsFA().removeAt(index)
    this.onChange(index-1)
  }

  initOrderForm() {
    this.orderFG = this.fb.group({
      id: new FormControl(null),
      customer: new FormControl(null),
      date_registered: new FormControl(null),
      // @ts-ignore
      creator: new FormControl(JSON.parse(localStorage.getItem("currentUser")).id),
      units: new FormArray([this.initUnitFG()]),
      total: new FormControl({value: 0, disabled: true})
    })
  }

  get units(){
    return this.orderFG.get('units') as FormArray
  }

  initUnitFG() {
    return this.fb.group({
      product: new FormControl(null),
      amount: new FormControl(null),
      price: new FormControl(null),
      subTotal: new FormControl({value: 0, disabled: true})
    })
  }

  createPorosi() {
    // console.log(this.orderFG.value)
    this.orderFG.get("date_registered")?.setValue(formatDate(this.orderFG.get("date_registered")?.value, 'YYYY-MM-dd', 'en'))
    this.http.post(this.url, this.orderFG.value).subscribe((resultData: any) => {
      console.log(resultData)
      alert("Sukses")
      this.getAllPorosi(this.url)
    })
    // let data = {
    //   "customer": this.customer,
    //   "creator": this.creator,
    //   "units": [this.product, this.amount, this.price]
    //   // "amount": this.amount,
    //   // "price": this.price
    // };
    // this.http.post(this.url, data).subscribe((resultData: any) => {
    //   console.log(resultData);
    //   alert("Sukses");
    //   this.getAllPorosi(this.url);
    // });
  }

  getAllPorosi(url: string) {
    this.http.get(url).subscribe((resultData: any) => {
      console.log(resultData)
      if (this.orderArray === undefined) {
        this.orderArray = resultData.results
      } else {
        this.orderArray = this.orderArray.concat(resultData.results)
      }
      if (resultData.next != null) {
        this.getAllPorosi(resultData.next)
      }
    })
  }

  getAllClient() {
    this.http.get("http://127.0.0.1:8000/customers/").subscribe((resultData: any) => {
      console.log(resultData)
      this.clientArray = resultData.results
    })
  }

  getAllCreator() {
    this.http.get("http://127.0.0.1:8000/users/").subscribe((resultData: any) => {
      console.log(resultData)
      this.creatorArray = resultData.results
    })
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log('products', resultData)
      this.productArray = resultData.results;
    })
  }

  setUpdate(data: any) {
    this.orderFG.patchValue(data)
    // this.orderFG.get("customer")?.setValue(data.customer)
    // @ts-ignore
    this.orderFG.get("creator")?.setValue(JSON.parse(localStorage.getItem("currentUser")).id)
    data.units.forEach((unit: any) => {
      this.patchUnitOnUpdate(unit)
    })
    // this.customer = data.customer
    // this.creator = data.creator
    // this.units = data.units
    // this.amount = data.units.amount
    // this.price = data.units.price
    // this.porosiID = data.id
  }

  updatePorosi() {
    this.orderFG.get("date_registered")?.setValue(formatDate(this.orderFG.get("date_registered")?.value, 'YYYY-MM-dd', 'en'))
    this.http.put("http://127.0.0.1:8000/ordersUpdate/" + this.orderFG.get('id')?.value, this.orderFG.value).subscribe((resultData: any) => {
      console.log(resultData)
      this.getAllPorosi(this.url)
    })
    // let data = {
    //   "customer": this.customer,
    //   "creator": this.creator,
    //   "units": this.units,
    //   "amount": this.amount,
    //   "price": this.price
    // }
    // this.http.put("http://127.0.0.1:8000/ordersUpdate/" + this.porosiID, data).subscribe((resultData: any) => {
    //   console.log(resultData);
    //   alert("Sukses")
    //   this.customer = ''
    //   this.creator = ''
    //   this.units = []
    //   this.amount = 0
    //   this.price = 0
    //   this.getAllPorosi(this.url);
    // })
  }

  deletePorosi(data: any) {
    this.http.delete("http://127.0.0.1:8000/ordersUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllPorosi(this.url);
    })
  }

  patchUnitOnUpdate(unit: any) {
    this.getUnitsFA().push(this.initUnitFGOnUpdate(unit))
  }

  initUnitFGOnUpdate(unit: any) {
    return this.fb.group({
      product: new FormControl(unit.product),
      amount: new FormControl(unit.amount),
      price: new FormControl(unit.price)
    })
  }

  onChange(index: number) {
    if(this.units.length === 0){
      this.orderFG.get('total')?.setValue(0)
    }
    // @ts-ignore
    const subTotal = (this.units.at(index).get('amount').value || 0) *
      // @ts-ignore
      (this.units.at(index).get('price').value || 0);
    // @ts-ignore

    this.units.at(index).get('subTotal').setValue(subTotal);
    const total = this.getUnitsFA().value.reduce((acc: any, curr: any) => {
      acc += (curr.amount || 0) * (curr.price || 0);
      return acc;
    }, 0);
    this.orderFG.get('total')?.setValue(total);
  }

  getPrice(product: any, index: number){
    this.units.at(index).get('price')?.setValue(product.default_price)
  }
}
