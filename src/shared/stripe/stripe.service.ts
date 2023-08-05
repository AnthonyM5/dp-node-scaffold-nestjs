import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  // method to test the stripe integration, can be removed when we add other calls
  public getCustomers(): Stripe.ApiListPromise<Stripe.Customer> {
    return this.stripeClient.customers.list();
  }
}
