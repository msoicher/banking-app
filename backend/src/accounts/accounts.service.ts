import { Injectable } from '@nestjs/common';
import { UpApiService } from '../up-api/up-api.service';

@Injectable()
export class AccountsService {
  constructor(private readonly upApi: UpApiService) {}

  async listAccounts() {
    return this.upApi.get('/accounts');
  }

  async getAccount(id: string) {
    return this.upApi.get(`/accounts/${id}`);
  }
}
