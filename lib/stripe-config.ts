export function isStripeTestMode(): boolean {
  return process.env.STRIPE_TEST_MODE === 'true';
}

export function getStripeSecretKey(): string {
  return isStripeTestMode()
    ? process.env.STRIPE_TEST_SECRET_KEY || ''
    : process.env.STRIPE_SECRET_KEY || '';
}

export function getStripeWebhookSecret(): string {
  return isStripeTestMode()
    ? process.env.STRIPE_TEST_WEBHOOK_SECRET || ''
    : process.env.STRIPE_WEBHOOK_SECRET || '';
}

export function getStripePublishableKey(): string {
  return isStripeTestMode()
    ? process.env.STRIPE_TEST_PUBLISHABLE_KEY || ''
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
}
