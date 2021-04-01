import { Injectable } from '@nestjs/common';
import { categorys } from 'src/pseudo_database/categorys';

@Injectable()
export class CategoryService {
  categoryAll() {
    const userTypes = categorys.filter(
        (currentValue) => currentValue.id === process.env.USER_ID || currentValue.id === 'all',
    );

    return userTypes
}

categoryAdd(listsDto) {
    listsDto.id = process.env.USER_ID;

    categorys.push(listsDto)

    return  categorys
}

}
