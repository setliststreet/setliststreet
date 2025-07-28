'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cxfyeuwosrplubgaluwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM'
);

const shows = [
  {
    id: '1',
    date: '15-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
  },
  {
    id: '2',
    date: '16-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
  },
  {
    id: '3',
    date: '17-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
  },
];

export default function AdminSetlistPage() {
  const [selectedShowId, setSelectedShowId] = useState('');
  const [opener, setOpener] = useState('');
  const [status, setStatus] = useState('');

  const selectedShow = shows.find((show) => show.id === selectedShowId);

  useEffect(() => {
    const fetchOpener = async () => {
      if (!selectedShow) return;
      setOpener('Fetching...');

      try {          
       
        const res = await fetch(
  `/api/fetchSetlists?artistName=Dead%20%26%20Company&date=${selectedShow.date}&city=${encodeURIComponent(selectedShow.city)}`
);

        const data = await res.json();

        if (data?.firstSong) {
          setOpener(data.firstSong);
          setStatus('');
        } else {
          setOpener('');
          setStatus('⚠️ No opener found for this show.');
        }
      } catch (err) {
        setOpener('');
        setStatus('❌ Error fetching opener.');
      }
    };

    if (selectedShowId) {
      fetchOpener();
    }
  }, [selectedShowId]);

  const handleSubmit = async () => {
    if (!selectedShow || !opener || opener === 'Fetching...') {
      setStatus('Please wait until the opener is fetched.');
      return;
    }

    const { id, date, venue, city, state } = selectedShow;

    const { error } = await supabase.from('setlists').upsert({
      show_id: id,
      date,
      venue,
      city,
      state,
      opener,
    });

    if (error) {
      setStatus(`❌ Supabase Error: ${error.message}`);
    } else {
      setStatus('✅ Setlist saved successfully!');
      setSelectedShowId('');
      setOpener('');
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white space-y-4">
      <h1 className="text-2xl font-bold text-center">🎸 Admin Setlist Panel</h1>

      <select
        className="w-full border p-2 rounded"
        value={selectedShowId}
        onChange={(e) => {
          setSelectedShowId(e.target.value);
          setStatus('');
        }}
      >
        <option value="">-- Select a Show --</option>
        {shows.map((show) => (
          <option key={show.id} value={show.id}>
            {show.date} — {show.venue}
          </option>
        ))}
      </select>

      {selectedShow && (
        <div className="text-sm text-gray-800 space-y-1">
          <p><strong>Venue:</strong> {selectedShow.venue}</p>
          <p><strong>City:</strong> {selectedShow.city}</p>
          <p><strong>State:</strong> {selectedShow.state}</p>
          <p><strong>Opener:</strong> {opener}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Save to Supabase
      </button>

      {status && (
        <p className="text-center text-sm text-gray-600">{status}</p>
      )}
    </main>
  );
}
