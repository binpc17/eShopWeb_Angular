import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  produits! : any;
  public currentSize : number = 5;
  public currentPage : number =0;
  public totalPage! : number;
  public pages : number [] =[];
  public keyword : string ="";


  constructor(private http: HttpClient, private productService : ProductService, private router: Router) { }

  ngOnInit(): void {
    this.onGetProduct();
  }

  onGetProduct() {
    this.productService.getProducts(this.currentPage, this.currentSize)
      .subscribe(data=>{
        this.produits= data;
        // @ts-ignore
        this.totalPage= data["page"].totalPages;
        this.pages = [];
        for (let i=0; i <this.totalPage; i++) {
          this.pages.push(i);
        }

      },error => {
        console.log("NET ERROR >>"+error);
      })

  }

  onGetProducts (i: number) {
    this.currentPage  = i;
    this.onGetProduct();
  }

  onSearchProduct() {
    this.productService.getProductsByKeyWord(this.keyword,this.currentPage, this.currentSize)
      .subscribe(rs=>{
        this.produits= rs;
        // @ts-ignore
        this.totalPage= rs["page"]?.totalPages;
        this.pages = [];
        for (let i=0; i <this.totalPage; i++) {
          this.pages.push(i);
        }

      },error => {
        console.log("NET ERROR >>"+error);
      })
  }

  onSearch(value: any) {
    console.log(">VALUE>>"+value);

  }

  onDeleteProduct(p: any) {
    let confi =confirm("Are you sure you want to delete this Product?");
    if (confi){
      console.log(">****>>"+p._links.self.href);
      console.log(">Product>>"+JSON.stringify(p));
      this.productService.deleteRessource(p._links.self.href)
        .subscribe(rs=>{
          console.log(">Product removed Successfully...");
          this.onGetProduct();
        },error => {
          console.log("NET ERROR >>"+error);
        })
    }
  }

  onEditProduct(p: any){
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
    //btoa(url) IS To encore URL LIKE urlEncode
  }
}
