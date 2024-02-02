// correios.module.ts

import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosResolver } from './correios.resolver';

@Module({
  providers: [CorreiosService, CorreiosResolver],
})
export class CorreiosModule {}
