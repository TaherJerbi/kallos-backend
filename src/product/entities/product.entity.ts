import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from 'src/brand/entities/brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
