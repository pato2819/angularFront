import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  nombre = '';
  metodo = 'GET'; // valor inicial
  respuesta: any;

  constructor(private http: HttpClient) {}

  obtenerSaludo() {
    if (this.metodo === 'GET') {
      const params = new HttpParams().set('nombre', this.nombre);
      this.http.get<any>('http://10.0.10.210/api/saludos', { params })
        .subscribe({
          next: data => this.respuesta = data,
          error: () => this.respuesta = { mensaje: 'Error al consultar la API' }
        });
    } else {
      const body = { nombre: this.nombre };
      this.http.post<any>('http://10.0.10.210/api/saludos', body)
        .subscribe({
          next: data => this.respuesta = data,
          error: () => this.respuesta = { mensaje: 'Error al consultar la API' }
        });
    }
  }
}
