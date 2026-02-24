import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { UpApiModule } from '../up-api/up-api.module';

@Module({
  imports: [UpApiModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
