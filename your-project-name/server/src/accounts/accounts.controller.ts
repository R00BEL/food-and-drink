import { Controller, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private configService: ConfigService,
  ) {}

  @Post('signIn')
  async signIn(@Body() createAccountDto: CreateAccountDto) {
    const secret = this.configService.get('SECRET');
    return this.accountsService.signIn(createAccountDto, secret);
  }

  @Post('signUp')
  signUp(@Body() createAccountDto: CreateAccountDto) {
    console.log(createAccountDto);
    const secret = this.configService.get('SECRET');
    return this.accountsService.signUp(createAccountDto, secret);
  }
}
