import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiservice: ApiService) {}

  getProducts(url: string, params: any): Observable<any> {
    return this.apiservice.get(url, params);
  }
}
