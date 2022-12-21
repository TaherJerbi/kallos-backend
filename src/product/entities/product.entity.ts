import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category.enum';

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

  // enum Category Column
  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;
}
