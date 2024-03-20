import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
  DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {

  @Input() display: boolean = false;
  // allways be provieded
  @Input() header!: string;

  @Output() displayChange = new EventEmitter<boolean>()

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };



  @Output() confirm = new EventEmitter<Product>();

  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false
    this.displayChange.emit(this.display)
  }

  onCencel() {
    this.display = false;
    this.displayChange.emit(this.display)
  }

}
