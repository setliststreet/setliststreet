import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artistName, year } = req.query;

  if (!artistName || !year) {
    return res.status(400).json({ error: 'Missing artistName or year' });
  }

  try {
    const response = await fetch(
      `https://api.setlist.fm/rest/1.0/search/setlists?artistName=${encodeURIComponent(
        artistName as string
      )}&year=${encodeURIComponent(year as string)}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': process.env.SETLISTFM_API_KEY || '9b6iZdnkEmlkq9Ip_INb3sZUDNtmwixddcWr',
        },
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error('Upstream Setlist.fm error:', response.status, text);
      return res.status(response.status).json({
        error: 'Upstream error',
        status: response.status,
        message: text,
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error('Failed to parse JSON from upstream:', jsonError);
      return res.status(502).json({ error: 'Invalid JSON from upstream' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
