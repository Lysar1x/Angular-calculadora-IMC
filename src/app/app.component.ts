import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImcComponent } from './imc/imc.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImcComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'calculadora-imc';
}
