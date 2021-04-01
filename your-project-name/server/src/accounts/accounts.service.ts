import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { STATUS_CODES } from 'node:http';
import { accounts } from 'src/pseudo_database/accounts';
import { secret } from 'src/pseudo_database/secret';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {

  signIn(createAccountDto: CreateAccountDto) {
    const userPassword = crypto
    .createHash('sha256')
    .update(createAccountDto.password + secret)
    .digest('base64');

    let user = accounts.find(
      (currentValue) =>
          createAccountDto.login === currentValue.login && userPassword === currentValue.password,  
    );

    if (user) {
      console.log('Welcome ' + user.login);
      console.log(user)
      console.log("token " + jwt.sign({ id: user.id }, secret))
      return {token: jwt.sign({ id: user.id }, secret)}
    }
    else {
      console.log('username or password entered incorrectly');
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }

  signUp(createAccountDto: CreateAccountDto) {
    const userPassword = crypto
    .createHash('sha256')
    .update(createAccountDto.password + secret)
    .digest('base64');

    accounts.push({
      id: nanoid(),
      login: createAccountDto.login,
      password: userPassword,
  });

    console.log('add account ' + createAccountDto.login)
    return accounts;
  }

}
