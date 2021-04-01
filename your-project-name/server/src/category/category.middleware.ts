import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { accounts } from 'src/pseudo_database/accounts';
import { secret } from 'src/pseudo_database/secret';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authorization = req.headers.authorization.split(' ');
    const token = authorization[1];
    if (token !== 'null') {
      const payload = jwt.verify(token, secret);
      let user = accounts.find((currentValue) => currentValue.id === payload.id);

      if (user) {
        process.env.USER_ID = user.id
        next();
        return;
      }
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
