import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    return this.brandRepository.save(createBrandDto);
  }

  findAll() {
    return this.brandRepository.find();
  }

  findAllWithProducts() {
    return this.brandRepository.find({
      relations: ['products'],
    });
  }

  findOne(id: number) {
    return this.brandRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update({ id }, updateBrandDto);
  }

  remove(id: number) {
    return this.brandRepository.delete({ id });
  }
}
