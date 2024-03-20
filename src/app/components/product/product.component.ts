import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private ConfirmationService: ConfirmationService) {}

  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }
  confirmDelete() {
    this.ConfirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct()
      },
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {}
}
