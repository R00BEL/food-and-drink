import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { ConfigService } from '@nestjs/config';
const jwt = require('jsonwebtoken');

@Injectable()
export class ListsMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>
  ) {}

  async use(req: any, res: any, next: () => void) {
    const secret: string = this.configService.get('SECRET')
    const authorization: string[] = req.headers.authorization.split(' ');
    const token: string = authorization[1];
    if (token !== 'null') {
      const payload = jwt.verify(token, secret);
      let user = await this.pg.any(`select * from accounts where userid = '${payload.id}'`);

      if (user.length) {
        req.USER_ID = user[0].userid
        next();
        return;
      }
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
