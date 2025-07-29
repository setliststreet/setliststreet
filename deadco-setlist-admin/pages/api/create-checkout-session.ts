// Next.js API route example (pages/api/create-checkout-session.ts)

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe('pk_test_51Rq6NOLqw92ARrdP0wANut2U6u90qihi6WNOEMyBO3hQ58nZxyAJqT6t9LeJz9hKQ2vNbTdR36YQQHwjBLupVff100t1YdOpoq', {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, mode, song } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: `${mode === 'charity' ? 'Charity Donation' : 'Cash Entry'}`,
              description: song ? `For song: ${song}` : undefined,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success?mode=${mode}&song=${encodeURIComponent(song || '')}`,
      cancel_url: 'http://localhost:3000/cancel',

    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
}
