import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save({
      ...createProductDto,
      brand: {
        id: createProductDto.brandId,
      },
    });
  }

  findAll() {
    return this.productsRepository.find({
      relations: ['brand'],
    });
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update({ id }, updateProductDto);
  }

  remove(id: number) {
    return this.productsRepository.delete({ id });
  }
}
