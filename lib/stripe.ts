import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const getStripe = () => {
  return stripe
}

export interface StripeProduct {
  id: string
  name: string
  description?: string
  price: number
  currency: string
}

export interface StripeCheckoutSession {
  id: string
  url: string
  amount_total: number
  currency: string
  status: string
}
