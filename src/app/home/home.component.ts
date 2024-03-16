import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  array = [1, 2, 3, 4, 56, 8];
  myString = 'hellllllllo';
  onClickMain() {
    alert('wowowo angular');
  }
}
