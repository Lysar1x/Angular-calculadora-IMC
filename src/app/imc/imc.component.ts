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

  calcularIMC() {
    if (this.peso > 0 && this.altura > 0) {
      this.imc = this.peso / (this.altura * this.altura);
      this.determinarEstado();
    } else {
      this.imc = 0;
      this.estado = '';
    }
  }

  determinarEstado() {
    if (this.imc < 18.5) {
      this.estado = 'Bajo peso';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      this.estado = 'Normal';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      this.estado = 'Sobrepeso';
    } else {
      this.estado = 'Obesidad';
    }
  }
}
