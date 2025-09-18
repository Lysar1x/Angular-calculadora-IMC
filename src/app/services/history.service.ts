import { Injectable } from '@angular/core';

// Definimos la interfaz para darle una estructura clara a cada registro
export interface HistorialEntry {
  imc: number;
  estado: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly HISTORIAL_KEY = 'imcHistorial'; // La "llave" para guardar en localStorage

  constructor() {}

  // Función para obtener el historial guardado
  obtenerHistorial(): HistorialEntry[] {
    const historialGuardado = localStorage.getItem(this.HISTORIAL_KEY);
    if (historialGuardado) {
      // Si hay datos, los convertimos de texto a un array de objetos
      return JSON.parse(historialGuardado);
    }
    // Si no hay nada, devolvemos un array vacío
    return [];
  }

  // Función para añadir un nuevo resultado al historial
  guardarResultado(entry: HistorialEntry): void {
    // 1. Obtenemos el historial actual
    const historial = this.obtenerHistorial();

    // 2. Añadimos el nuevo registro al principio del array
    historial.unshift(entry);

    // 3. Guardamos el array actualizado de vuelta en localStorage
    localStorage.setItem(this.HISTORIAL_KEY, JSON.stringify(historial));
  }
}
