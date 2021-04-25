import { Accounts } from 'src/accounts/acounts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Categories } from './categories.entity';

@Entity()
export class Category_user {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Categories, (categories) => categories.category, {
    eager: true,
  })
  category: Categories;

  @ManyToOne(() => Accounts, (accounts) => accounts.userid, {
    eager: true,
    nullable: false,
  })
  user: Accounts;
}
