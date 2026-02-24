import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  listAccounts() {
    return this.accountsService.listAccounts();
  }

  @Get(':id')
  getAccount(@Param('id') id: string) {
    return this.accountsService.getAccount(id);
  }
}
