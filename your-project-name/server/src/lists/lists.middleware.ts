import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const jwt = require('jsonwebtoken');
import { accounts } from 'src/pseudo_database/accounts';

@Injectable()
export class ListsMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  
  use(req: any, res: any, next: () => void) {
    const secret = this.configService.get('SECRET')
    const authorization = req.headers.authorization.split(' ');
    const token = authorization[1];
    if (token !== 'null') {
      const payload = jwt.verify(token, secret);
      let user = accounts.find((currentValue) => currentValue.id === payload.id);

      if (user) {
        req.USER_ID = user.id
        next();
        return;
      }
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}