import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ProductModel} from "../model/product.model";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public currentProduct!: ProductModel;
  private url!: string;

  constructor(private productService: ProductService, private router: Router, private activedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    //console.log("this.url>"+JSON.stringify(this.activedRouter.snapshot.params));
    this.url = atob(this.activedRouter.snapshot.params['id']);
    console.log(this.url);
    this.productService.getRessource(this.url)
      .subscribe(rs => {
        this.currentProduct = rs;

      }, error => {
        console.log("NET ERROR >>" + error);
      })
  }

  onSaveParoduct(value: any) {
    this.productService.upDateRessource(this.url, value)
      .subscribe(rs => {
        alert("Product has been updated Successfully...");
        console.log(">Product updated Successfully...");
        this.router.navigateByUrl("/products");
      }, error => {
        console.log("NET ERROR >>" + error);
      })
  }

}
