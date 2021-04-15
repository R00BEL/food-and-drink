import { Controller, Post, Body, Inject} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private configService: ConfigService,
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>
  ) {}

  @Post('signIn')
  async signIn(@Body() createAccountDto: CreateAccountDto) {
    const secret = this.configService.get('SECRET')
    return this.accountsService.signIn(createAccountDto, secret, this.pg);
  }

  @Post('signUp')
  signUp(@Body() createAccountDto: CreateAccountDto) {
    console.log(createAccountDto)
    const secret = this.configService.get('SECRET')
    return this.accountsService.signUp(createAccountDto, secret, this.pg);
  }
}
