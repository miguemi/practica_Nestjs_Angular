import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:3000/producto/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
//se deja el valor nulo para que se tome la configuracion de la parte de la base de datos
  saveProduct(product: Product): Observable<any> {
    // Incluir el campo 'id' con valor nulo
    const productData = { ...product, id: null };
    return this.http.post(this.url, productData);
  }

  getAProduct(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editProduct(id: string, product: Product): Observable<any> {
    return this.http.patch(this.url + id, product);
  }
}
