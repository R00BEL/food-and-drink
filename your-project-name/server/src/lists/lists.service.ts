import { Injectable } from '@nestjs/common';

@Injectable()
export class ListsService {

    async listAll(userId, pg) {
        return pg.any(`select category, name, photo from lists where userid = '${userId}'`)
    }

    async listAdd(listsDto, userId, pg) {
		  let listAdd: []= await pg.any(`insert into lists(userId, category, name, photo) values ('${userId}', '${listsDto.category}', '${listsDto.name}', '${listsDto.photo}')`);
      listAdd;
    }
}
