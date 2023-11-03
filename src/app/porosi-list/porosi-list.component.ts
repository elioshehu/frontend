import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-porosi-list',
  templateUrl: './porosi-list.component.html',
  styleUrls: ['./porosi-list.component.css']
})
export class PorosiListComponent {
  orderArray: any[] = [];

  url = "http://127.0.0.1:8000/orders/"

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.getAllPorosi(this.url);
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

  deletePorosi(data: any) {
    this.http.delete("http://127.0.0.1:8000/ordersUpdate/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Sukses")
      this.getAllPorosi(this.url);
    })
  }
  goTo(id: any){
    this.router.navigate([`../porosi/${id}`])
  }
}
