import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.css',
})
export class ImcComponent {
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  estado: string = '';
}
