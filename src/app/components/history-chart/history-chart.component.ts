import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HistorialEntry } from '../../services/history.service';
import { Chart, registerables } from 'chart.js';

// Registramos todos los elementos de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-history-chart',
  standalone: true,
  imports: [],
  templateUrl: './history-chart.component.html',
  styleUrl: './history-chart.component.scss',
})
export class HistoryChartComponent implements AfterViewInit, OnChanges {
  // @Input() permite que el componente reciba datos desde su padre (ImcComponent)
  @Input() historial: HistorialEntry[] = [];

  // @ViewChild nos da acceso al elemento <canvas> del HTML
  @ViewChild('bmiChart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  // Se ejecuta después de que la vista del componente se ha inicializado
  ngAfterViewInit(): void {
    this.createChart();
  }

  // Se ejecuta cada vez que los datos de @Input() cambian
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historial'] && this.chart) {
      this.updateChart();
    }
  }

  createChart(): void {
    const context = this.chartCanvas.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    const labels = this.historial
      .map((entry) => new Date(entry.fecha).toLocaleDateString())
      .reverse();
    const data = this.historial.map((entry) => entry.imc).reverse();

    this.chart = new Chart(context, {
      type: 'line', // Tipo de gráfica
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Historial de IMC',
            data: data,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.historial
        .map((entry) => new Date(entry.fecha).toLocaleDateString())
        .reverse();
      this.chart.data.datasets[0].data = this.historial
        .map((entry) => entry.imc)
        .reverse();
      this.chart.update();
    }
  }
}
