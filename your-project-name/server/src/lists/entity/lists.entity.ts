import { Accounts } from 'src/accounts/acounts.entity';
import { Categories } from 'src/category/entity/categories.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Lists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

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
