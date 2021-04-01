import { Controller, Post, Body} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService,) {}

  @Post('signIn')
  signIn(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.signIn(createAccountDto);
  }

  @Post('signUp')
  signUp(@Body() createAccountDto: CreateAccountDto) {
    console.log(createAccountDto)
    return this.accountsService.signUp(createAccountDto);
  }
}
