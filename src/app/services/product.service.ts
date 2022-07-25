import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModel} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  public getProducts(page: number, size: number) {
    return this.http.get(environment.backendHot + "/products?page=" + page + "&size=" + size);
  }

  public getProductsByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(environment.backendHot + "/products/search/byDesignattion?mc=" + mc + "&page=" + page + "&size=" + size);
  }

  public deleteRessource(url: string) {
    return this.http.delete(url);
  }

  public saveRessource(url: string, data: any): Observable<ProductModel> {
    return this.http.post<ProductModel>(url, data);
  }

  public getRessource(url: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(url);
  }

  public upDateRessource(url: string, data: any) {
    return this.http.put(url, data);
  }
}
