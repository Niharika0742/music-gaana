import React, { useState, useRef, useEffect } from "react";
import song1 from './assets/music/song1.mp3';
import song2 from './assets/music/song2.mp3';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';

const songs = [
  {
    name: "Song 1",
    artist: "Artist 1",
    url: song1,
    image: image1,
  },
  {
    name: "Song 2",
    artist: "Artist 2",
    url: song2,
    image: image2,
  },
  // Add more songs here
];

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    // Handle time update logic here
  };

  return (
    <div>
      {/* Image */}
      <div>
        <img
          alt={songs[currentSongIndex].name}
          src={songs[currentSongIndex].image}
          style={{ maxWidth: '100%', maxHeight: '300px' }}
        />
      </div>
      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onTimeUpdate={handleTimeUpdate}
        controls
      />
      {/* Controls */}
      <div>
        <button onClick={() => setCurrentSongIndex((currentSongIndex + 1) % songs.length)}>
          Next Song
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
