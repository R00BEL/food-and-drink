import { Injectable } from '@nestjs/common';
import { lists } from 'src/pseudo_database/lists';

@Injectable()
export class ListsService {

    listAll(userId) {
        const userLists = lists.filter(
            (currentValue) => currentValue.id === userId,
        );

        return userLists
    }

    listAdd(listsDto, userId) {
        listsDto.id = userId;


        lists.push(listsDto)

        console.log('add in account: ')
        console.log(listsDto)
    }

}
