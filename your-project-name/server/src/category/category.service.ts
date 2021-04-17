import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  async categoryAll(userId, pg) {
    return pg.any(`select category from category_user where userid = '${userId}'`)
	}

	async categoryAdd(listsDto, userId, pg) {
		listsDto.id = userId;

		const checkForExistence: []= await pg.any(`select * from categories where category = '${listsDto.name}' limit 1`);
		if(!checkForExistence.length) {
			let addCategory: []= await pg.any(`insert into categories(category) values('${listsDto.name}')`)
			addCategory;
		}

		let addCategory_user: []= await pg.any(`insert into category_user(userId, category) values('${listsDto.id}', '${listsDto.name}')`);
		addCategory_user;
	}
}
