import { Injectable } from '@nestjs/common';
import { lists } from 'src/pseudo_database/lists';

@Injectable()
export class ListsService {

    listAll() {
        const userLists = lists.filter(
            (currentValue) => currentValue.id === process.env.USER_ID,
        );

        return userLists
    }

    listAdd(listsDto) {
        listsDto.id = process.env.USER_ID;


        lists.push(listsDto)

        console.log('add in account: ')
        console.log(listsDto)
    }

}
