import { Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Injectable()
export class ListsService {
  constructor(
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
  ) {}

  async listAll(userId) {
    return this.pg.any(
      'select category, name, photo from lists where userid = $1',
      [userId],
    );
  }

  async listAdd(listsDto, userId) {
    console.log(listsDto);
    let listAdd: string[] = await this.pg.any(
      'insert into lists(userId, category, name, photo) values ($1, $2, $3, $4)',
      [userId, listsDto.category, listsDto.name, listsDto.photo],
    );
    listAdd;
  }
}
