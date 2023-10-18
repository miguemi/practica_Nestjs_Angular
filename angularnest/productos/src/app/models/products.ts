export class Product{
    id:number;
    nombre: string;
    categoria: string; 
    precio: number; 
    estado: string; 

  
    constructor( id: number,  nombre: string, categoria: string, precio: number, estado: string){
      this.id = id; 
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.estado = estado;
    }
  }