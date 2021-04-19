import { Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
  ) {}

  async categoryAll(userId) {
    return this.pg.any(
      `select category from category_user where userid = '${userId}'`,
    );
  }

  async categoryAdd(listsDto, userId) {
    listsDto.id = userId;

    const checkForExistence: string[] = await this.pg.any(
      'select * from categories where category = $1 limit 1',
      [listsDto.name],
    );
    if (!checkForExistence.length) {
      let addCategory: string[] = await this.pg.any(
        'insert into categories(category) values($1)',
        [listsDto.name],
      );
      addCategory;
    }

    let addCategory_user: string[] = await this.pg.any(
      'insert into category_user(userId, category) values($1, $2)',
      [listsDto.id, listsDto.name],
    );
    addCategory_user;
  }
}
