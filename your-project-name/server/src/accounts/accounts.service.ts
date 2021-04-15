import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

@Injectable()
export class AccountsService {
  private logger = new Logger('controller');

  async signIn(createAccountDto, secret, pg) {
    const userPassword = crypto
    .createHash('sha256')
    .update(createAccountDto.password + secret)
    .digest('base64');
    
    let user = await pg.any(`select * from accounts where login = '${createAccountDto.login}' and password = '${userPassword}'`)

    if (user.length) {
      console.log('Welcome ' + createAccountDto.login);
      console.log(user)
      console.log("token " + jwt.sign({ id: user[0].userid }, secret))
      return {token: jwt.sign({ id: user[0].userid }, secret)}
    }
    else {
      console.log('username or password entered incorrectly');
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }

  async signUp(createAccountDto, secret, pg) {
    const userPassword = crypto
    .createHash('sha256')
    .update(createAccountDto.password + secret)
    .digest('base64');

    pg.any(`insert into accounts(userId, login, password) values ('${nanoid()}', '${createAccountDto.login}', '${userPassword}')`)

    console.log('add account ' + createAccountDto.login)
  }

}
