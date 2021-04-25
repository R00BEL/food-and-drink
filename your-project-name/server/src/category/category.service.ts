import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { Accounts } from 'src/accounts/acounts.entity';
import { Connection, Repository } from 'typeorm';
import { Categories } from './entity/categories.entity';
import { Category_user } from './entity/category_user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(Category_user)
    private category_userRepository: Repository<Category_user>,
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    private connection: Connection,
  ) {}

  async categoryAll(userId) {
    const user = await this.accountsRepository.findOne({ userid: userId });
    const a = await this.category_userRepository.find({ user: user });
    return await this.category_userRepository.find({ user: user });
  }

  async categoryAdd(listsDto, userId) {
    const checkForExistence = await this.categoriesRepository.findOne({
      category: listsDto.category,
    });
    if (!checkForExistence) {
      console.log('add in category');

      await this.connection.transaction(async (manager) => {
        const categories = new Categories();

        categories.category = listsDto.name;

        await manager.save(categories);
      });
    }

    await this.connection.transaction(async (manager) => {
      const user = await this.accountsRepository.findOne({ userid: userId });
      const category = await this.categoriesRepository.findOne({
        category: listsDto.category,
      });

      console.log(user);
      console.log(category);

      const category_user = new Category_user();
      category_user.user = user;
      category_user.category = category;

      await manager.save(category_user);
    });
  }
}
