import { Module } from '@nestjs/common';
import { UpApiService } from './up-api.service';

@Module({
  providers: [UpApiService],
  exports: [UpApiService],
})
export class UpApiModule {}
