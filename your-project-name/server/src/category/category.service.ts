import { Injectable } from '@nestjs/common';
import { categorys } from 'src/pseudo_database/categorys';

@Injectable()
export class CategoryService {
  categoryAll(userId) {
    const userTypes = categorys.filter(
        (currentValue) => currentValue.id === userId || currentValue.id === 'all',
    );

    return userTypes
}

categoryAdd(listsDto, userId) {
    listsDto.id = userId;

    categorys.push(listsDto)

    return  categorys
}

}
