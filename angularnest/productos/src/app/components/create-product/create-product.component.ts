import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  title = 'Crear Producto';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private _productService: ProductService, private aRouter: ActivatedRoute) {
    this.productForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');

    // Deshabilitar el campo "id" inicialmente
    this.productForm.get('id')?.disable();
  }

  ngOnInit(): void {
    this.Edit();
  }

  addProduct() {
    const PRODUCT: Product = {
      id: this.productForm.get('id')?.value,
      nombre: this.productForm.get('nombre')?.value,
      categoria: this.productForm.get('categoria')?.value,
      precio: this.productForm.get('precio')?.value,
      estado: this.productForm.get('estado')?.value,
    };

    // Verificar si existe el producto
    if (this.id !== null) {
      // El producto existe, se edita
      this._productService.editProduct(this.id, PRODUCT).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      });
    } else {
      // El producto no existe, se crea
      console.log(PRODUCT);
      this._productService.saveProduct(PRODUCT).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      });
    }
  }

  Edit() {
    if (this.id !== null) {
      this.title = 'Editar Producto';
      this._productService.getAProduct(this.id).subscribe(data => {
        this.productForm.setValue({
          id: data.id,
          nombre: data.nombre,
          categoria: data.categoria,
          precio: data.precio,
          estado: data.estado
        });
        // Habilitar el campo "id" cuando se está editando
        this.productForm.get('id')?.enable();
      });
    }
  }
}
