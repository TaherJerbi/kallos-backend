import { OrderItem } from 'src/orders/entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import Category from './category.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({nullable: true})
  details: string;

  @Column('json')
  images: string[] = []

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  image?: string;

  // enum Category Column
  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToMany(() => User, (user) => user.likedProducts)
  usersWhoLiked: User[];
}
