import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-produkte',
  templateUrl: './produkte.component.html',
  styleUrls: ['./produkte.component.css']
})
export class ProdukteComponent {
  productFG: FormGroup = new FormGroup({})
  ProdukteArray: any[] = [];

  produktID?: number;
  update: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.getAllProduct();
    this.initProductForm();
  }

  ngOnInit() {
    this.produktID = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (this.produktID) {
      this.update = true
      this.setUpdate(this.produktID)
    }
  }

  createProduct() {
    if(!this.update) {
      this.http.post("http://127.0.0.1:8000/products/", this.productFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses");
        this.getAllProduct();
      });
    }
    else{
      this.http.put("http://127.0.0.1:8000/productsUpdate/" + this.productFG.get("id")?.value, this.productFG.value).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Sukses")
        this.getAllProduct();
      })
    }
  }

  getAllProduct() {
    this.http.get("http://127.0.0.1:8000/products/").subscribe((resultData: any) => {
      console.log(resultData)
      this.ProdukteArray = resultData.results
    })
  }

  setUpdate(id: number) {
    this.http.get(`http://127.0.0.1:8000/productsUpdate/${id}`).subscribe((resultData: any) => {
      this.productFG.patchValue(resultData)
    })
  }

  // updateProduct() {
  //   this.http.put("http://127.0.0.1:8000/productsUpdate/" + this.productFG.get("id")?.value, this.productFG.value).subscribe((resultData: any) => {
  //     console.log(resultData);
  //     alert("Sukses")
  //     this.getAllProduct();
  //   })
  // }

  initProductForm() {
    this.productFG = this.fb.group({
      name: new FormControl(null),
      default_price: new FormControl(null),
      description: new FormControl(null),
      id: new FormControl(null),
    })
  }

  goTo() {
    let url = this.router.url.substring(0, this.router.url.indexOf("?"))
    this.router.navigateByUrl(url + "produkteList")
  }

  resetForm(){
    this.productFG.reset()
  }
}
