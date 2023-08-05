import { Test, TestingModule } from '@nestjs/testing';
import { StripeCoreModule } from 'nestjs-stripe/lib/StripeCoreModule';

import { stripeVersion } from '../../constants';
import { StripeService } from './stripe.service';

describe('StripeService', () => {
  let service: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        StripeCoreModule.forRoot({
          apiKey: 'test',
          apiVersion: stripeVersion as any,
        }),
      ],
      providers: [StripeService],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
