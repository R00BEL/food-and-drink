import { Injectable } from '@nestjs/common';
import { lists } from 'src/pseudo_database/lists';

@Injectable()
export class ListsService {

    listAll(req) {
        const userLists = lists.filter(
            (currentValue) => currentValue.id === req.user.id,
        );

        return userLists
    }

    listAdd(listsDto, req) {
        listsDto.id = req.user.id;


        lists.push(listsDto)

        console.log('add in account: ')
        console.log(listsDto)
    }

}
