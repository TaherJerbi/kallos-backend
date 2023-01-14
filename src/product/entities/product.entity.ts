import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
