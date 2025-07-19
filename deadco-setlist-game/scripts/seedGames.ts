import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedGames() {
  const games = [
    {
      type: 'Opener (First Set)',
      show_date: '2024-08-01',
      is_open: true,
      entry_fee: 0
    },
    {
      type: 'Encore',
      show_date: '2024-08-02',
      is_open: true,
      entry_fee: 5
    },
    {
      type: 'Full Setlist',
      show_date: '2024-08-03',
      is_open: false,
      entry_fee: 10
    },
    {
      type: 'Multi-show (3-night sweep)',
      show_date: '2024-08-01',
      is_open: true,
      entry_fee: 20
    }
  ];

  for (const game of games) {
    const { error } = await supabase.from('games').insert([game]);
    if (error) {
      console.error('Error inserting game:', game, error.message);
    } else {
      console.log('Inserted game:', game.type, game.show_date);
    }
  }
  console.log('Seeding complete.');
}

seedGames(); 