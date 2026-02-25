import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  listTransactions(
    @Query('pageSize') pageSize?: string,
    @Query('status') status?: string,
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.transactionsService.listTransactions({
      pageSize: pageSize ? parseInt(pageSize) : undefined,
      status,
      since,
      until,
      category,
      tag,
    });
  }

  @Get('account/:accountId')
  listTransactionsByAccount(
    @Param('accountId') accountId: string,
    @Query('pageSize') pageSize?: string,
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('pageAfter') pageAfter?: string,
  ) {
    return this.transactionsService.listTransactionsByAccount(accountId, {
      pageSize: pageSize ? parseInt(pageSize) : undefined,
      since,
      until,
      pageAfter,
    });
  }

  @Get(':id')
  getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransaction(id);
  }
}
