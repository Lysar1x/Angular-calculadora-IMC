import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistoryService, HistorialEntry } from '../services/history.service';

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.css',
})
export class ImcComponent implements OnInit {
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  estado: string = '';
  recomendacion: string = '';
  historial: HistorialEntry[] = [];

  edad: number = 0;
  genero: string = 'Hombre';

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historial = this.historyService.obtenerHistorial();
  }

  calcularIMC() {
    // Validamos que el peso y la altura sean mayores a cero
    if (this.peso > 0 && this.altura > 0) {
      // 1. Convertimos la altura de centímetros a metros
      const alturaEnMetros = this.altura / 100;

      // 2. Hacemos el cálculo con la altura en metros
      this.imc = this.peso / (alturaEnMetros * alturaEnMetros);

      this.determinarEstado();
      const nuevoRegistro: HistorialEntry = {
        imc: this.imc,
        estado: this.estado,
        fecha: new Date().toLocaleString('es-MX'), // Guarda la fecha y hora actual
      };
      this.historyService.guardarResultado(nuevoRegistro);
      this.historial = this.historyService.obtenerHistorial();
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

    if (this.edad > 65) {
      this.recomendacion +=
        ' Para adultos mayores, es importante discutir estos rangos con un médico.';
    }
  }

  getIndicatorWidth(): string {
    const minImc = 15;
    const maxImc = 40;
    const percent = ((this.imc - minImc) / (maxImc - minImc)) * 100;
    const finalPercent = Math.max(0, Math.min(100, percent));
    return `${finalPercent}%`;
  }
}
