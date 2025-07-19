import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from '../components/Layout';

// Song data interface
interface Song {
  name: string;
  frequency?: number;
}

// Setlist structure
interface SetlistStructure {
  set1: {
    opener: string | null;
    songs: (string | null)[];
    closer: string | null;
  };
  set2: {
    opener: string | null;
    songs: (string | null)[];
    drums: string | null;
    space: string | null;
    backFromSpace: string | null;
    secondHalfSongs: (string | null)[];
    closer: string | null;
  };
  encores: (string | null)[];
}

// Draggable song component
const DraggableSong: React.FC<{ song: string; onRemove: () => void }> = ({ song, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'song',
    item: { song },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'move',
        display: 'inline-block',
        fontSize: '12px',
        minWidth: '120px',
        textAlign: 'center',
      }}
      onClick={onRemove}
    >
      {song}
    </div>
  );
};

// Drop zone component
const DropZone: React.FC<{
  value: string | null;
  onDrop: (song: string) => void;
  onManualEntry: (song: string) => void;
  placeholder: string;
  allSongs: string[];
}> = ({ value, onDrop, onManualEntry, placeholder, allSongs }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'song',
    drop: (item: { song: string }) => {
      onDrop(item.song);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const filtered = allSongs.filter(song => 
        song.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (songName: string) => {
    onManualEntry(songName);
    setInputValue('');
    setSuggestions([]);
    setShowInput(false);
  };

  return (
    <div
      ref={drop}
      style={{
        minHeight: '40px',
        minWidth: '150px',
        padding: '8px',
        margin: '4px',
        border: '2px dashed #ccc',
        borderColor: isOver ? '#007bff' : '#ccc',
        backgroundColor: isOver ? '#e3f2fd' : value ? '#e8f5e8' : '#fff',
        borderRadius: '4px',
        position: 'relative',
        fontSize: '14px',
        textAlign: 'center',
        cursor: value ? 'pointer' : 'default',
      }}
      onClick={() => !value && setShowInput(true)}
    >
      {value ? (
        <div onClick={() => onDrop('')}>{value}</div>
      ) : showInput ? (
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && inputValue && handleSubmit(inputValue)}
            onBlur={() => setTimeout(() => setShowInput(false), 200)}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              textAlign: 'center',
            }}
            placeholder="Type song..."
          />
          {suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 1000,
              maxHeight: '150px',
              overflowY: 'auto',
            }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                  }}
                  onMouseDown={() => handleSubmit(suggestion)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: '#999' }}>{placeholder}</div>
      )}
    </div>
  );
};

const SetlistBuilderBarebones: React.FC = () => {
  const [allSongs, setAllSongs] = useState<string[]>([]);
  const [scatteredSongs, setScatteredSongs] = useState<string[]>([]);
  const [setlist, setSetlist] = useState<SetlistStructure>({
    set1: {
      opener: null,
      songs: [null, null], // Start with 2 songs
      closer: null,
    },
    set2: {
      opener: null,
      songs: [null], // Start with 1 song
      drums: 'Drums',
      space: 'Space',
      backFromSpace: null,
      secondHalfSongs: [null], // Start with 1 song
      closer: null,
    },
    encores: [null], // Start with 1 encore
  });

  // Load songs from CSV data
  useEffect(() => {
    // Mock some popular Dead & Co songs for now
    const mockSongs = [
      'Feel Like a Stranger', 'Help on the Way', 'Slipknot!', 'Franklin\'s Tower',
      'Tennessee Jed', 'The Harder They Come', 'Casey Jones', 'Passenger',
      'Scarlet Begonias', 'Fire on the Mountain', 'Estimated Prophet', 'Eyes of the World',
      'Looks Like Rain', 'Tangled Up in Blue', 'Knockin\' on Heaven\'s Door', 'Ripple',
      'Truckin\'', 'Sugar Magnolia', 'Uncle John\'s Band', 'Touch of Grey',
      'Box of Rain', 'Friend of the Devil', 'Shakedown Street', 'The Music Never Stopped',
      'Dark Star', 'St. Stephen', 'The Eleven', 'Terrapin Station',
      'Playing in the Band', 'China Cat Sunflower', 'I Know You Rider', 'Turn on Your Love Light',
      'Morning Dew', 'Stella Blue', 'Brokedown Palace', 'Black Peter'
    ];
    
    setAllSongs(mockSongs);
    setScatteredSongs([...mockSongs]); // All songs start scattered
  }, []);

  const handleDrop = (section: string, index?: number) => (song: string) => {
    if (song === '') {
      // Clear the slot
      const newSetlist = { ...setlist };
      if (section === 'set1.opener') newSetlist.set1.opener = null;
      else if (section === 'set1.closer') newSetlist.set1.closer = null;
      else if (section === 'set1.songs' && typeof index === 'number') {
        newSetlist.set1.songs[index] = null;
      }
      // Add similar logic for set2 and encores...
      setSetlist(newSetlist);
      return;
    }

    // Remove from scattered songs
    setScatteredSongs(prev => prev.filter(s => s !== song));
    
    // Add to setlist
    const newSetlist = { ...setlist };
    if (section === 'set1.opener') {
      if (newSetlist.set1.opener) setScatteredSongs(prev => [...prev, newSetlist.set1.opener!]);
      newSetlist.set1.opener = song;
    } else if (section === 'set1.closer') {
      if (newSetlist.set1.closer) setScatteredSongs(prev => [...prev, newSetlist.set1.closer!]);
      newSetlist.set1.closer = song;
    } else if (section === 'set1.songs' && typeof index === 'number') {
      if (newSetlist.set1.songs[index]) setScatteredSongs(prev => [...prev, newSetlist.set1.songs[index]!]);
      newSetlist.set1.songs[index] = song;
    } else if (section === 'set2.opener') {
      if (newSetlist.set2.opener) setScatteredSongs(prev => [...prev, newSetlist.set2.opener!]);
      newSetlist.set2.opener = song;
    } else if (section === 'set2.closer') {
      if (newSetlist.set2.closer) setScatteredSongs(prev => [...prev, newSetlist.set2.closer!]);
      newSetlist.set2.closer = song;
    } else if (section === 'set2.songs' && typeof index === 'number') {
      if (newSetlist.set2.songs[index]) setScatteredSongs(prev => [...prev, newSetlist.set2.songs[index]!]);
      newSetlist.set2.songs[index] = song;
    } else if (section === 'set2.backFromSpace') {
      if (newSetlist.set2.backFromSpace) setScatteredSongs(prev => [...prev, newSetlist.set2.backFromSpace!]);
      newSetlist.set2.backFromSpace = song;
    } else if (section === 'set2.secondHalfSongs' && typeof index === 'number') {
      if (newSetlist.set2.secondHalfSongs[index]) setScatteredSongs(prev => [...prev, newSetlist.set2.secondHalfSongs[index]!]);
      newSetlist.set2.secondHalfSongs[index] = song;
    } else if (section === 'encores' && typeof index === 'number') {
      if (newSetlist.encores[index]) setScatteredSongs(prev => [...prev, newSetlist.encores[index]!]);
      newSetlist.encores[index] = song;
    }
    
    setSetlist(newSetlist);
  };

  const addSong = (section: 'set1' | 'set2.first' | 'set2.second' | 'encores') => {
    const newSetlist = { ...setlist };
    if (section === 'set1') {
      newSetlist.set1.songs.push(null);
    } else if (section === 'set2.first') {
      newSetlist.set2.songs.push(null);
    } else if (section === 'set2.second') {
      newSetlist.set2.secondHalfSongs.push(null);
    } else if (section === 'encores') {
      newSetlist.encores.push(null);
    }
    setSetlist(newSetlist);
  };

  const removeSongFromScattered = (song: string) => {
    setScatteredSongs(prev => prev.filter(s => s !== song));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout title="Setlist Builder - Barebones">
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Barebones Setlist Builder</h1>
          
          {/* Scattered Songs */}
          <div style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#f9f9f9' 
          }}>
            <h3>Available Songs (Drag to Setlist)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {scatteredSongs.map((song, index) => (
                <DraggableSong 
                  key={`${song}-${index}`} 
                  song={song} 
                  onRemove={() => removeSongFromScattered(song)} 
                />
              ))}
            </div>
          </div>

          {/* Setlist Structure */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Set 1 */}
            <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '8px' }}>
              <h2>Set 1</h2>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Opener:</strong>
                <DropZone
                  value={setlist.set1.opener}
                  onDrop={handleDrop('set1.opener')}
                  onManualEntry={handleDrop('set1.opener')}
                  placeholder="Set 1 Opener"
                  allSongs={allSongs}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Songs:</strong>
                {setlist.set1.songs.map((song, index) => (
                  <DropZone
                    key={index}
                    value={song}
                    onDrop={handleDrop('set1.songs', index)}
                    onManualEntry={handleDrop('set1.songs', index)}
                    placeholder={`Song ${index + 1}`}
                    allSongs={allSongs}
                  />
                ))}
                <button 
                  onClick={() => addSong('set1')}
                  style={{ margin: '8px', padding: '8px 16px' }}
                >
                  + Add Song
                </button>
              </div>

              <div>
                <strong>Closer:</strong>
                <DropZone
                  value={setlist.set1.closer}
                  onDrop={handleDrop('set1.closer')}
                  onManualEntry={handleDrop('set1.closer')}
                  placeholder="Set 1 Closer"
                  allSongs={allSongs}
                />
              </div>
            </div>

            {/* Set 2 */}
            <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '8px' }}>
              <h2>Set 2</h2>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Opener:</strong>
                <DropZone
                  value={setlist.set2.opener}
                  onDrop={handleDrop('set2.opener')}
                  onManualEntry={handleDrop('set2.opener')}
                  placeholder="Set 2 Opener"
                  allSongs={allSongs}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>First Half Songs:</strong>
                {setlist.set2.songs.map((song, index) => (
                  <DropZone
                    key={index}
                    value={song}
                    onDrop={handleDrop('set2.songs', index)}
                    onManualEntry={handleDrop('set2.songs', index)}
                    placeholder={`Song ${index + 1}`}
                    allSongs={allSongs}
                  />
                ))}
                <button 
                  onClick={() => addSong('set2.first')}
                  style={{ margin: '8px', padding: '8px 16px' }}
                >
                  + Add Song
                </button>
              </div>

              <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#e0e0e0' }}>
                <div><strong>Drums</strong></div>
                <div><strong>Space</strong></div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Back From Space:</strong>
                <DropZone
                  value={setlist.set2.backFromSpace}
                  onDrop={handleDrop('set2.backFromSpace')}
                  onManualEntry={handleDrop('set2.backFromSpace')}
                  placeholder="Back From Space"
                  allSongs={allSongs}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong>Second Half Songs:</strong>
                {setlist.set2.secondHalfSongs.map((song, index) => (
                  <DropZone
                    key={index}
                    value={song}
                    onDrop={handleDrop('set2.secondHalfSongs', index)}
                    onManualEntry={handleDrop('set2.secondHalfSongs', index)}
                    placeholder={`Song ${index + 1}`}
                    allSongs={allSongs}
                  />
                ))}
                <button 
                  onClick={() => addSong('set2.second')}
                  style={{ margin: '8px', padding: '8px 16px' }}
                >
                  + Add Song
                </button>
              </div>

              <div>
                <strong>Closer:</strong>
                <DropZone
                  value={setlist.set2.closer}
                  onDrop={handleDrop('set2.closer')}
                  onManualEntry={handleDrop('set2.closer')}
                  placeholder="Set 2 Closer"
                  allSongs={allSongs}
                />
              </div>
            </div>
          </div>

          {/* Encores */}
          <div style={{ 
            marginTop: '20px', 
            border: '2px solid #333', 
            padding: '15px', 
            borderRadius: '8px' 
          }}>
            <h2>Encore(s)</h2>
            {setlist.encores.map((song, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>Encore {index + 1}:</strong>
                <DropZone
                  value={song}
                  onDrop={handleDrop('encores', index)}
                  onManualEntry={handleDrop('encores', index)}
                  placeholder={`Encore ${index + 1}`}
                  allSongs={allSongs}
                />
              </div>
            ))}
            <button 
              onClick={() => addSong('encores')}
              style={{ margin: '8px', padding: '8px 16px' }}
            >
              + Add Encore
            </button>
          </div>

          {/* Debug/Preview */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '8px' 
          }}>
            <h3>Setlist Preview:</h3>
            <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(setlist, null, 2)}
            </pre>
          </div>
        </div>
      </Layout>
    </DndProvider>
  );
};

export default SetlistBuilderBarebones; 