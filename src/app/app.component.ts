import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

interface Libro {
  titulo: string;
  autor: string;
  lenguaje: string;
}

interface Genero {
  nombre: string;
  libros: Libro[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  data:any[] = [];

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.llenarData();
  }

  llenarData() {
    this.apiservice.getdata().subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  

  
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
          // Recargar los datos después de agregar el libro, si es necesario
          this.llenarData();
        },
        (error) => {
          console.error('Error al agregar el libro:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      );
    }
  }

  eliminarLibro(libro: any) {
    console.log(libro.id)
    const confirmacion = confirm(`¿Está seguro de que desea eliminar el libro "${libro.nombre}"?`);
    if (confirmacion) {
      console.log(libro.id)
      this.apiservice.deletedata(libro.id).subscribe(
        (response) => {
          console.log('Libro eliminado con éxito:', response);
          // Recargar los datos después de eliminar el libro
          this.llenarData();
        },
        (error) => {
          console.error('Error al eliminar el libro:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      );
    }
  }

  actualizarLibro(libro: any) {
    const nombre = prompt('Ingrese el título del libro:');
    const autor = prompt('Ingrese el autor del libro:');
    const genero = prompt('Ingrese el género del libro:');
    const lenguaje = prompt('Ingrese el lenguaje del libro:');
  
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
          // Recargar los datos después de actualizar el libro
          this.llenarData();
        },
        (error) => {
          console.error('Error al actualizar el libro:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      );
    }
  }


  }
  