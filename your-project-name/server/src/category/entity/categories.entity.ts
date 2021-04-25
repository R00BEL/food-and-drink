import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category_user } from './category_user.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;
}
