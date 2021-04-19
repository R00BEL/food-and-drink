import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { nanoid } from 'nanoid';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

@Injectable()
export class AccountsService {
  constructor(
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
  ) {}

  async signIn(createAccountDto, secret) {
    const userPassword = crypto
      .createHash('sha256')
      .update(createAccountDto.password + secret)
      .digest('base64');

    let user = await this.pg.any(
      'select * from accounts where login = $1 and password = $2',
      [createAccountDto.login, userPassword],
    );

    if (user.length) {
      console.log('Welcome ' + createAccountDto.login);
      console.log(user);
      console.log('token ' + jwt.sign({ id: user[0].userid }, secret));
      return { token: jwt.sign({ id: user[0].userid }, secret) };
    } else {
      console.log('username or password entered incorrectly');
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async signUp(createAccountDto, secret) {
    const userPassword = crypto
      .createHash('sha256')
      .update(createAccountDto.password + secret)
      .digest('base64');

    this.pg.any(
      'insert into accounts(userId, login, password) values ($1, $2, $3)',
      [nanoid(), createAccountDto.login, userPassword],
    );

    console.log('add account ' + createAccountDto.login);
  }
}
