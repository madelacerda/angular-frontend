import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  productURL = 'http://localhost:8080/products/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL).pipe(
      map((products) => products as Product[]),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  public addProduct(product: Product) {
    return this.http.post<Product>(`${this.productURL}`, product);
  }

  public editProduct(product: Product) {
    return this.http.put<Product>(`${this.productURL}/` + product._id, product);
  }

  public getProductbyId(product: Product) {
    return this.http.get<Product>(`${this.productURL}/` + product._id);
  }
}
