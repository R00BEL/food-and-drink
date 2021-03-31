import { Injectable } from '@nestjs/common';
import { types } from 'src/pseudo_database/type';

@Injectable()
export class TypesService {
    
    typeAll(req) {
        const userTypes = types.filter(
            (currentValue) => currentValue.id === req.user.id || currentValue.id === 'all',
        );

        return userTypes
    }

    typeAdd(listsDto, req) {
        listsDto.id = req.user.id;

        types.push(listsDto)

        return  types
    }

}
