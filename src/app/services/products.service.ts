import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiservice: ApiService) {}

  getProducts(url: string, params: PaginationParams): Observable<Products> {
    return this.apiservice.get(url, {
      params,
      responseType: 'json',
    });
  }
  addProduct(url: string, body: Product): Observable<Product> {
    return this.apiservice.post(url, body, { responseType: 'json' });
  }
  editProduct(url: string, body: Product): Observable<Product> {
    return this.apiservice.put(url, body, { responseType: 'json' });
  }
  deleteProduct(url: string): Observable<Product> {
    return this.apiservice.delete(url, { responseType: 'json' });
  }
}
