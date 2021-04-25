import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { nanoid } from 'nanoid';
import { Accounts } from './acounts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accuntsRepository: Repository<Accounts>,
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
    private connection: Connection,
  ) {}

  async signIn(createAccountDto, secret) {
    const userPassword = crypto
      .createHash('sha256')
      .update(createAccountDto.password + secret)
      .digest('base64');

    let user = await this.accuntsRepository.findOne({
      login: createAccountDto.login,
      password: userPassword,
    });

    if (user) {
      console.log('Welcome ' + createAccountDto.login);
      console.log(user);
      console.log('token ' + jwt.sign({ id: user.userid }, secret));
      return { token: jwt.sign({ id: user.userid }, secret) };
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

    await this.connection.transaction(async (manager) => {
      const accounts = new Accounts();

      accounts.userid = nanoid();
      accounts.login = createAccountDto.login;
      accounts.password = userPassword;

      await manager.save(accounts);
    });
  }
}
