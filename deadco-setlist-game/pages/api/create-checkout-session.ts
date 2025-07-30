// Next.js API route example (pages/api/create-checkout-session.ts)

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe('sk_test_51OUuMQSDNquEEED5oGqJgbnOADlaaTh152Xrv50XPNrGeMqicVDxhQBCDkSO4k86VCIxy6OGClcbCQxGobF1BoPy006Q510lRY', {
  apiVersion: '2022-11-15',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, mode, song } = req.body;

  if (!amount || !mode || !song) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const origin = req.headers.origin || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr', // Change to your desired currency
            product_data: {
              name: `Guess Game - ${mode}`,
              description: `Your song choice: ${song}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
console.error('Stripe session error:', JSON.stringify(err, null, 2));
    return res.status(500).json({ error: 'Failed to create session' });
  }
}


