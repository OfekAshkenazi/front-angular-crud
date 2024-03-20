import { Component } from '@angular/core';
import { ProductsService } from './../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  totalRecords: number = 0;

  onPageChange(event: any) {
    this.getProducts(event.page, event.rows);
  }

  getProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    console.log(product, 'edit');
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, 5);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(product: Product, id: number) {
    this.productsService
      .deleteProduct(`http://localhost:300/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, 5);

        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:300/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, 5);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    this.getProducts(0, 5);
  }
}
