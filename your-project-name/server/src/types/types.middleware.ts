import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { accounts } from 'src/pseudo_database/accounts';
import { secret } from 'src/pseudo_database/secret';

@Injectable()
export class TypesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authorization = req.headers.authorization.split(' ');
    const token = authorization[1];
    if (token !== 'null') {
      const payload = jwt.verify(token, secret);
      let user = accounts.find((currentValue) => currentValue.id === payload.id);

      req.user = user;
    }

    if (token !== 'null') next();
    else res.status(401).json([]);
  }
}
