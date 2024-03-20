import { Component } from '@angular/core';
import { ProductsService } from './../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { EditComponent } from '../components/edit/edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  totalRecords: number = 0;
  displayAddProduct: boolean = false;
  displayEditProduct: boolean = false;

  toggleEditView(product: Product) {
    this.selectedProduct = product;
    this.displayEditProduct = true;
  }

  toggleAddView() {
    this.displayAddProduct = true;
  }

  toggleDeleteView(product: Product) {
    this.deleteProduct(product.id);
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddProduct = false;
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayEditProduct = false;
  }

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

  deleteProduct(id: any) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          this.getProducts(0, 5);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    console.log('got to home from add');
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, 5);
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }

  ngOnInit() {
    this.getProducts(0, 5);
  }
}
