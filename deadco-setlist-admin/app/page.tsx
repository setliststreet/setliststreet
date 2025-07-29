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
  const [set1Closer, setSet1Closer] = useState('');
  const [set2Opener, setSet2Opener] = useState('');
  const [set2Closer, setSet2Closer] = useState('');
  const [set2PreDrums, setSet2PreDrums] = useState('');
  const [set2PostDrums, setSet2PostDrums] = useState('');
  const [encoreCloser, setEncoreCloser] = useState('');
  const [status, setStatus] = useState('');
  const [showOpensAt, setShowOpensAt] = useState('');
  const [winnerDecisionTime, setWinnerDecisionTime] = useState('');
  const [songs, setSongs] = useState([]);

  const selectedShow = shows.find((show) => show.id === selectedShowId);

  useEffect(() => {
    const fetchOpener = async () => {
      if (!selectedShow) return;

      setOpener('Fetching...');
      setStatus('⏳ Fetching setlist...');

      try {
        const res = await fetch(
          `/api/fetchSetlists?date=${selectedShow.date}&city=${encodeURIComponent(selectedShow.city)}`
        );

        const data = await res.json();
        const setlist = data.setlist?.[0];
        if (!setlist) {
          setStatus('⚠️ No setlist found.');
          return;
        }

        const sets = setlist.sets.set || [];
        const allSongs = sets.flatMap((set) => set.song.map((song) => ({
          name: song.name,
          cover: song.cover?.name || null,
          info: song.info || null,
          tape: song.tape || false,
        })));

        const [set1, set2, encore] = sets;

        setOpener(set1?.song?.[0]?.name || '');
        setSet1Closer(set1?.song?.at(-1)?.name || '');
        setSet2Opener(set2?.song?.[0]?.name || '');
        setSet2Closer(set2?.song?.at(-1)?.name || '');

        const drumsIndex = set2?.song?.findIndex((s) => s.name.toLowerCase().includes('drum'));
        if (drumsIndex !== -1) {
          setSet2PreDrums(set2.song[drumsIndex - 1]?.name || '');
          setSet2PostDrums(set2.song[drumsIndex + 1]?.name || '');
        }

        setEncoreCloser(set2?.song?.at(-1)?.name || '');

        const [day, month, year] = selectedShow.date.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        setShowOpensAt(`${formattedDate}T17:00`);
        setWinnerDecisionTime(`${formattedDate}T23:59`);
        setSongs(allSongs);

        await supabase.from('setlists').upsert({
          show_id: selectedShow.id,
          date: setlist.eventDate,
          venue: setlist.venue.name,
          city: setlist.venue.city.name,
          state: setlist.venue.city.state,
          songs: allSongs,
          opener: set1?.song?.[0]?.name || '',
          set1_closer: set1?.song?.at(-1)?.name || '',
          set2_opener: set2?.song?.[0]?.name || '',
          set2_closer: set2?.song?.at(-1)?.name || '',
          set2_pre_drums: set2PreDrums,
          set2_post_drums: set2PostDrums,
          encore_closer: set2?.song?.at(-1)?.name || '',
          show_opens_at: new Date(`${formattedDate}T17:00:00Z`).toISOString(),
          winner_decision_time: new Date(`${formattedDate}T23:59:00Z`).toISOString(),
        }, { onConflict: ['show_id', 'date'] });

        setStatus('✅ Setlist stored!');
      } catch (err) {
        console.error(err);
        setStatus('❌ Error occurred');
      }
    };

    if (selectedShowId) fetchOpener();
  }, [selectedShowId]);

  const handleSubmit = async () => {
    if (!selectedShow || !opener || opener === 'Fetching...') {
      setStatus('⚠️ Please wait until the opener is fetched.');
      return;
    }

    if (songs.length === 0) {
      setStatus('⚠️ Songs data is missing. Fetch the setlist first.');
      return;
    }

    const { id, date, venue, city, state } = selectedShow;

    const { error } = await supabase
      .from('setlists')
      .upsert(
        {
          show_id: id,
          date,
          venue,
          city,
          state,
          opener,
          songs,
          show_opens_at: new Date(showOpensAt).toISOString(),
          winner_decision_time: new Date(winnerDecisionTime).toISOString(),
        },
        { onConflict: ['show_id', 'date'] } 
      );

    if (error) {
      setStatus(`❌ Supabase Error: ${error.message}`);
    } else {
      setStatus('✅ Updated manually!');
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
        <>

        <div className="space-y-1 text-sm">
          <p><strong>Opener:</strong> {opener}</p>
          <p><strong>Set 1 Closer:</strong> {set1Closer}</p>
          <p><strong>Set 2 Opener:</strong> {set2Opener}</p>
          <p><strong>Set 2 Closer:</strong> {set2Closer}</p>
          <p><strong>Set 2 Pre-Drums:</strong> {set2PreDrums}</p>
          <p><strong>Set 2 Post-Drums:</strong> {set2PostDrums}</p>
          <p><strong>Encore Closer:</strong> {encoreCloser}</p>
        </div>

          <div className="text-sm text-gray-800 space-y-1">
            <p><strong>Venue:</strong> {selectedShow.venue}</p>
            <p><strong>City:</strong> {selectedShow.city}</p>
            <p><strong>State:</strong> {selectedShow.state}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Show Opens At:</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={showOpensAt}
              onChange={(e) => setShowOpensAt(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700">Winner Decision Time:</label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={winnerDecisionTime}
              onChange={(e) => setWinnerDecisionTime(e.target.value)}
            />
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Save / Update Manually
      </button>

      {status && <p className="text-center text-sm text-gray-600">{status}</p>}
    </main>
  );
}

