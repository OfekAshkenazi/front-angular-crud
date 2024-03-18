import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';

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
}
