import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProductosService {


  constructor(
    @InjectRepository(Producto)
    private productRepository: Repository<Producto>,
  ) { }

  // Crea una instancia de Producto a partir del DTO (Data Transfer Object)
  create(createProductoDto: CreateProductoDto) {
    const nuevoProducto = this.productRepository.create(createProductoDto);
    return this.productRepository.save(nuevoProducto);
  }


  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Producto | undefined> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto | undefined> {
    const productExistente = await this.productRepository.findOne({ where: { id } });
    if (!productExistente) return undefined; //Puedes manejar el caso en que la tarea no se encuentra


    // Actualiza los campos de la tarea existente con los datos del DTO (Data Transfer Object)
    productExistente.id = updateProductoDto.id;
    productExistente.nombre = updateProductoDto.nombre;
    productExistente.categoria = updateProductoDto.categoria;
    productExistente.precio = updateProductoDto.precio;
    productExistente.estado = updateProductoDto.estado;


    return await this.productRepository.save(productExistente);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
  }
}
