'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminDecideWinners from '@admin/components/AdminDecideWinners';
import styles from './AdminSetlistPage.module.css';

const supabase = createClient(
  'https://cxfyeuwosrplubgaluwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM'
);

type Show = {
  id: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  guest: string;
};

type Song = {
  name: string;
  cover?: { name: string };
  info?: string;
  tape?: boolean;
};

type Set = {
  song: Song[];
};

const shows: Show[] = [
  {
    id: '1',
    date: '15-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
    guest: 'Dead & Company',
  },
  {
    id: '2',
    date: '16-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
    guest: 'Dead & Company',
  },
  {
    id: '3',
    date: '17-05-2025',
    venue: 'Sphere at The Venetian Resort',
    city: 'Las Vegas',
    state: 'NV',
    guest: 'Dead & Company',
  },
  {
    id: '4',
    date: '01-08-2025',
    venue: 'Golden Gate Park',
    city: 'San Francisco',
    state: 'CA',
    guest: 'Billy Strings',
  },
  {
    id: '5',
    date: '02-08-2025',
    venue: 'Golden Gate Park',
    city: 'San Francisco',
    state: 'CA',
    guest: 'Sturgill “Johnny Blue Skies” Simpson',
  },
  {
    id: '6',
    date: '03-08-2025',
    venue: 'Golden Gate Park',
    city: 'San Francisco',
    state: 'CA',
    guest: 'Trey Anastasio Band',
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
  const [songs, setSongs] = useState<Song[]>([]);
  const [fantasySet1, setFantasySet1] = useState<string[]>([]);
  const [fantasySet2PreDrums, setFantasySet2PreDrums] = useState<string[]>([]);
  const [fantasySet2PostDrums, setFantasySet2PostDrums] = useState<string[]>([]);
  const [fantasyEncore, setFantasyEncore] = useState<string[]>([]);

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

       if (selectedShow.id === '4'  || selectedShow.id === '5' || selectedShow.id === '6') {
  setStatus('⚠️ No setlist found. Please enter manually.');

  const [day, month, year] = selectedShow.date.split('-');
  const formattedDate = `${year}-${month}-${day}`;

  setOpener('');
  setSet1Closer('');
  setSet2Opener('');
  setSet2Closer('');
  setSet2PreDrums('');
  setSet2PostDrums('');
  setEncoreCloser('');
  setFantasySet1([]);
  setFantasySet2PreDrums([]);
  setFantasySet2PostDrums([]);
  setFantasyEncore([]);
  setSongs([]);
  setShowOpensAt(`${formattedDate}T17:00`);
  setWinnerDecisionTime(`${formattedDate}T23:59`);
  return; 
}


        const sets: Set[] = setlist.sets.set || [];
        const [set1, set2, encore] = sets;

        const allSongs: Song[] = sets.flatMap((set: Set) =>
          set.song.map((song) => ({
            name: song.name,
            cover: song.cover?.name || null,
            info: song.info || null,
            tape: song.tape || false,
          }))
        );

        const drumsIndex = set2?.song?.findIndex((s) => s.name.toLowerCase().includes('drum')) ?? -1;
        const spaceIndex = set2?.song?.findIndex((s) => s.name.toLowerCase().includes('space')) ?? -1;
        const postDrumsIndex = spaceIndex + 1;
        const tapeIndex = set2?.song?.findIndex((s) => s.tape === true) ?? -1;

        const nonTapeSongs = set2?.song?.filter((s) => !s.tape) || [];
        const set2CloserName = nonTapeSongs.at(-2)?.name || '';
        const encoreCloserName = nonTapeSongs.at(-1)?.name || '';

        const fantasySet2PreDrums = drumsIndex !== -1
          ? set2.song.slice(0, drumsIndex).map((s) => s.name)
          : [];

        const fantasySet2PostDrums = postDrumsIndex < set2.song.length
          ? set2.song.slice(postDrumsIndex, tapeIndex !== -1 ? tapeIndex : undefined).map((s) => s.name)
          : [];

        const postDrumsSong = set2?.song?.[postDrumsIndex]?.name || '';

        setOpener(set1?.song?.[0]?.name || '');
        setSet1Closer(set1?.song?.at(-1)?.name || '');
        setSet2Opener(set2?.song?.[0]?.name || '');
        setSet2Closer(set2CloserName);
        setSet2PreDrums(set2?.song?.[drumsIndex - 1]?.name || '');
        setSet2PostDrums(postDrumsSong);
        setEncoreCloser(encoreCloserName);

        setFantasySet1(set1?.song?.map((s) => s.name) || []);
        setFantasySet2PreDrums(fantasySet2PreDrums);
        setFantasySet2PostDrums(fantasySet2PostDrums);
        setFantasyEncore(encoreCloserName ? [encoreCloserName] : []);

        const [day, month, year] = selectedShow.date.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        setShowOpensAt(`${formattedDate}T17:00`);
        setWinnerDecisionTime(`${formattedDate}T23:59`);
        setSongs(allSongs);

        await supabase.from('setlists').upsert(
          {
            show_id: selectedShow.id,
            date: setlist.eventDate,
            venue: setlist.venue.name,
            city: setlist.venue.city.name,
            state: setlist.venue.city.state,
            songs: allSongs,
            opener: set1?.song?.[0]?.name || '',
            set1_closer: set1?.song?.at(-1)?.name || '',
            set2_opener: set2?.song?.[0]?.name || '',
            set2_closer: set2CloserName,
            set2_pre_drums: set2?.song?.[drumsIndex - 1]?.name || '',
            set2_post_drums: postDrumsSong,
            encore_closer: encoreCloserName,
            show_opens_at: new Date(`${formattedDate}T17:00:00Z`).toISOString(),
            winner_decision_time: new Date(`${formattedDate}T23:59:00Z`).toISOString(),
            fantasy_set1: set1?.song?.map((s) => s.name) || [],
            fantasy_set2_pre_drums: fantasySet2PreDrums,
            fantasy_set2_post_drums: fantasySet2PostDrums,
            fantasy_encore: encoreCloserName ? [encoreCloserName] : [],
          },
          { onConflict: ['show_id', 'date'] }
        );

        setStatus('✅ Setlist stored!');
      } catch (err) {
        console.error(err);
        setStatus('❌ Error occurred');
      }
    };

    if (selectedShowId) fetchOpener();
  }, [selectedShowId]);

  const handleSubmit = async () => {
    if (!selectedShow) {
      setStatus('⚠️ Select a show first.');
      return;
    }

    const { id, date, venue, city, state } = selectedShow;

    const { error } = await supabase.from('setlists').upsert(
      {
        show_id: id,
        date,
        venue,
        city,
        state,
        opener,
        set1_closer: set1Closer,
        set2_opener: set2Opener,
        set2_closer: set2Closer,
        set2_pre_drums: set2PreDrums,
        set2_post_drums: set2PostDrums,
        encore_closer: encoreCloser,
        songs,
        show_opens_at: new Date(showOpensAt).toISOString(),
        winner_decision_time: new Date(winnerDecisionTime).toISOString(),
        fantasy_set1: fantasySet1,
        fantasy_set2_pre_drums: fantasySet2PreDrums,
        fantasy_set2_post_drums: fantasySet2PostDrums,
        fantasy_encore: fantasyEncore,
      },
      { onConflict: ['show_id', 'date'] }
    );

    setStatus(error ? `❌ Supabase Error: ${error.message}` : '✅ Updated manually!');
  };

  return (
    <main className=''>
      <h1 className={styles.heading}>🎸 Admin Setlist Panel</h1>

      <select
        className={styles.select}
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
          <label className={styles.label}>Opener:</label>
          <input type="text" className={styles.input} value={opener} onChange={(e) => setOpener(e.target.value)} />

          <label className={styles.label}>Set 1 Closer:</label>
          <input type="text" className={styles.input} value={set1Closer} onChange={(e) => setSet1Closer(e.target.value)} />

          <label className={styles.label}>Set 2 Opener:</label>
          <input type="text" className={styles.input} value={set2Opener} onChange={(e) => setSet2Opener(e.target.value)} />

          <label className={styles.label}>Set 2 Closer:</label>
          <input type="text" className={styles.input} value={set2Closer} onChange={(e) => setSet2Closer(e.target.value)} />

          <label className={styles.label}>Set 2 Pre-Drums:</label>
          <input type="text" className={styles.input} value={set2PreDrums} onChange={(e) => setSet2PreDrums(e.target.value)} />

          <label className={styles.label}>Set 2 Post-Drums:</label>
          <input type="text" className={styles.input} value={set2PostDrums} onChange={(e) => setSet2PostDrums(e.target.value)} />

          <label className={styles.label}>Encore Closer:</label>
          <input type="text" className={styles.input} value={encoreCloser} onChange={(e) => setEncoreCloser(e.target.value)} />

          <label className={styles.label}>Show Opens At:</label>
          <input type="datetime-local" className={styles.input} value={showOpensAt} onChange={(e) => setShowOpensAt(e.target.value)} />

          <label className={styles.label}>Winner Decision Time:</label>
          <input type="datetime-local" className={styles.input} value={winnerDecisionTime} onChange={(e) => setWinnerDecisionTime(e.target.value)} />

          <h2 className={styles.label}>🎯 Fantasy Setlist Result</h2>

          <label className={styles.label}>Fantasy Set 1:</label>
          <textarea className={styles.textarea} value={fantasySet1.join('\n')} onChange={(e) => setFantasySet1(e.target.value.split('\n'))} />

          <label className={styles.label}>Fantasy Set 2 Pre-Drums:</label>
          <textarea className={styles.textarea} value={fantasySet2PreDrums.join('\n')} onChange={(e) => setFantasySet2PreDrums(e.target.value.split('\n'))} />

          <label className={styles.label}>Fantasy Set 2 Post-Drums:</label>
          <textarea className={styles.textarea} value={fantasySet2PostDrums.join('\n')} onChange={(e) => setFantasySet2PostDrums(e.target.value.split('\n'))} />

          <label className={styles.label}>Fantasy Encore:</label>
          <textarea className={styles.textarea} value={fantasyEncore.join('\n')} onChange={(e) => setFantasyEncore(e.target.value.split('\n'))} />
        </>
      )}

      <button onClick={handleSubmit} className={styles.button}>Save / Update Manually</button>
      {status && <p className={styles.status}>{status}</p>}
    </main>
  );
}

