import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const jwt = require('jsonwebtoken');
import { accounts } from 'src/pseudo_database/accounts';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    const secret: string = this.configService.get('SECRET')
    const authorization: string[] = req.headers.authorization.split(' ');
    const token: string = authorization[1];
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
