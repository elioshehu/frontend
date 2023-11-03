import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-porosi',
  templateUrl: './porosi.component.html',
  styleUrls: ['./porosi.component.css']
})
export class PorosiComponent {

  orderFG: FormGroup = new FormGroup({})
  // orderArray: any[] = [];
  clientArray: any[] = []
  // creatorArray: any[] = []
  productArray: any[] = []

  porosiID?: number;
  update: boolean = false;

  url = "http://127.0.0.1:8000/orders/"

  constructor(private http: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.getAllClient()
    this.getAllProduct()
    this.initOrderForm()
  }

  ngOnInit() {
    this.porosiID = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (this.porosiID) {
      this.update = true
      this.setUpdate(this.porosiID)
    }
  }

  getUnitsFA() {
    return this.orderFG.controls['units'] as FormArray
  }

  addUnits() {
    this.getUnitsFA().push(this.initUnitFG())
  }

  removeUnits(index: number) {
    this.getUnitsFA().removeAt(index)
    this.onChange(index - 1)
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

  get units() {
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
    if (!this.update) {
      this.orderFG.get("date_registered")?.setValue(formatDate(this.orderFG.get("date_registered")?.value, 'YYYY-MM-dd', 'en'))
      this.http.post(this.url, this.orderFG.value).subscribe((resultData: any) => {
        console.log(resultData)
        alert("Sukses")
      })
    } else {
      this.orderFG.get("date_registered")?.setValue(formatDate(this.orderFG.get("date_registered")?.value, 'YYYY-MM-dd', 'en'))
      this.http.put("http://127.0.0.1:8000/ordersUpdate/" + this.orderFG.get('id')?.value, this.orderFG.value).subscribe((resultData: any) => {
        console.log(resultData)
      })
    }
  }

  getAllClient() {
    this.http.get("http://127.0.0.1:8000/customers/").subscribe((resultData: any) => {
      console.log(resultData)
      this.clientArray = resultData.results
    })
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log('products', resultData)
      this.productArray = resultData.results;
    })
  }

  setUpdate(id: number) {
    this.http.get(`http://127.0.0.1:8000/ordersUpdate/${id}`).subscribe((resultData: any) => {
      this.orderFG.patchValue(resultData)
      // @ts-ignore
      this.orderFG.get("creator")?.setValue(JSON.parse(localStorage.getItem("currentUser")).id)
      resultData.units.slice(1).forEach((unit: any) => {
        this.patchUnitOnUpdate(unit)
      })
    })
  }

  patchUnitOnUpdate(unit: any) {
    this.getUnitsFA().push(this.initUnitFGOnUpdate(unit))
  }

  initUnitFGOnUpdate(unit: any) {
    return this.fb.group({
      product: new FormControl(unit.product),
      amount: new FormControl(unit.amount),
      price: new FormControl(unit.price),
      subTotal: new FormControl({value: 0, disabled: true})
    })
  }

  onChange(index: number) {
    if (this.units.length === 0) {
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

  getPrice(product: any, index: number) {
    this.units.at(index).get('price')?.setValue(product.default_price)
  }

  goTo() {
    let url = this.router.url.substring(0, this.router.url.indexOf("?"))
    this.router.navigateByUrl(url + "porosiList")
  }

  resetForm() {
    this.orderFG.reset()
  }
}
