import { Injectable } from '@nestjs/common';
import { UpApiService } from '../up-api/up-api.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly upApi: UpApiService) {}

  async listTransactions(params?: {
    pageSize?: number;
    status?: string;
    since?: string;
    until?: string;
    category?: string;
    tag?: string;
  }) {
    return this.upApi.get('/transactions', {
      'page[size]': params?.pageSize ?? 20,
      'filter[status]': params?.status,
      'filter[since]': params?.since,
      'filter[until]': params?.until,
      'filter[category]': params?.category,
      'filter[tag]': params?.tag,
    });
  }

  async listTransactionsByAccount(
    accountId: string,
    params?: { pageSize?: number; since?: string; until?: string; pageAfter?: string },
  ) {
    return this.upApi.get(`/accounts/${accountId}/transactions`, {
      'page[size]': params?.pageSize ?? 20,
      'page[after]': params?.pageAfter,
      'filter[since]': params?.since,
      'filter[until]': params?.until,
    });
  }

  async getTransaction(id: string) {
    return this.upApi.get(`/transactions/${id}`);
  }
}
