import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ProductModel} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct!: ProductModel;
  public mode: number = 1;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSaveParoduct(value: any) {
    console.log(value)
    this.productService.saveRessource(environment.backendHot + "/products", value)
      .subscribe(rs => {
        console.log(">Product saved Successfully...");
        this.currentProduct = rs;
        this.mode = 2;
        //this.router.navigateByUrl("/products");
      }, error => {
        console.log("NET ERROR >>" + error);
      })
  }

  onNewProduct() {
    this.mode = 1;
  }
}
