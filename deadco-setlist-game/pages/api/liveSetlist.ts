// pages/api/liveSetlist.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const setlistFmApiKey = '9b6iZdnkEmlkq9Ip_INb3sZUDNtmwixddcWr';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date, city } = req.query;

  if (!date || !city) {
    return res.status(400).json({ error: 'Missing date or city in query params' });
  }

  try {
    const apiRes = await fetch(
      `https://api.setlist.fm/rest/1.0/search/setlists?artistName=Dead%20%26%20Company&date=${date}&cityName=${encodeURIComponent(city as string)}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': setlistFmApiKey,
        },
      }
    );

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return res.status(apiRes.status).json({ error: `setlist.fm error: ${errText}` });
    }

    const data = await apiRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: `Server error: ${err instanceof Error ? err.message : 'Unknown error'}` });
  }
}
