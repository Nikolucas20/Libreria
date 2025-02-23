import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

interface Libro {
  id: number;
  nombre: string;
  autor: string;
  lenguaje: string;
  genero: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Libro[] = [];
  librosFiltrados: Libro[] = [];
  generoSeleccionado: string | null = null;

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.llenarData();
  }

  llenarData() {
    this.apiservice.getdata().subscribe((data: Libro[]) => {
      this.data = data;
      this.librosFiltrados = data;
      console.log(this.data);
    });
  }

  generosUnicos(): string[] {
    return [...new Set(this.data.map(libro => libro.genero))];
  }

  contarLibrosPorGenero(genero: string): number {
    return this.data.filter(libro => libro.genero === genero).length;
  }

  filtrarPorGenero(genero: string) {
    if (this.generoSeleccionado === genero) {
      this.generoSeleccionado = null;
      this.librosFiltrados = this.data;
    } else {
      this.generoSeleccionado = genero;
      this.librosFiltrados = this.data.filter(libro => libro.genero === genero);
    }
  }

  agregarLibro() {
    const nombre = prompt('Ingrese el título del libro:');
    const autor = prompt('Ingrese el autor del libro:');
    const genero = prompt('Ingrese el género del libro:');
    const lenguaje = prompt('Ingrese el lenguaje del libro:');
  
    if (nombre && autor && genero && lenguaje) {
      const nuevoLibro = {
        nombre,
        autor,
        genero,
        lenguaje
      };
  
      this.apiservice.postdata(nuevoLibro).subscribe(
        (response) => {
          console.log('Libro agregado con éxito:', response);
          this.llenarData();
        },
        (error) => {
          console.error('Error al agregar el libro:', error);
        }
      );
    }
  }

  eliminarLibro(libro: Libro) {
    const confirmacion = confirm(`¿Está seguro de que desea eliminar el libro "${libro.nombre}"?`);
    if (confirmacion) {
      this.apiservice.deletedata(libro.id).subscribe(
        (response) => {
          console.log('Libro eliminado con éxito:', response);
          this.llenarData();
        },
        (error) => {
          console.error('Error al eliminar el libro:', error);
        }
      );
    }
  }

  actualizarLibro(libro: Libro) {
    const nombre = prompt('Ingrese el título del libro:', libro.nombre);
    const autor = prompt('Ingrese el autor del libro:', libro.autor);
    const genero = prompt('Ingrese el género del libro:', libro.genero);
    const lenguaje = prompt('Ingrese el lenguaje del libro:', libro.lenguaje);
  
    if (nombre && autor && genero && lenguaje) {
      const libroActualizado = {
        nombre,
        autor,
        genero,
        lenguaje
      };
  
      this.apiservice.putdata(libro.id, libroActualizado).subscribe(
        (response) => {
          console.log('Libro actualizado con éxito:', response);
          this.llenarData();
        },
        (error) => {
          console.error('Error al actualizar el libro:', error);
        }
      );
    }
  }
}