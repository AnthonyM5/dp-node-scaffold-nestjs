import { Module } from '@nestjs/common';

import { SharedService } from './shared.service';
import { StripeService } from './stripe/stripe.service';

@Module({
  providers: [SharedService, StripeService],
  exports: [StripeService],
})
export class SharedModule {}
