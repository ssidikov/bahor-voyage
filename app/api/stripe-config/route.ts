import { NextResponse } from 'next/server';
import { getStripePublishableKey, isStripeTestMode } from '@/lib/stripe-config';

export async function GET() {
  return NextResponse.json({
    publishableKey: getStripePublishableKey(),
    testMode: isStripeTestMode(),
  });
}
