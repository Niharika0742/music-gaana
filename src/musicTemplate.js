import React, { useState, useRef, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import song1 from './assets/music/song1.mp3';
import song2 from './assets/music/song2.mp3';
import song3 from './assets/music/song3.mp3';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import image3 from './assets/images/image3.jpg';
import { motion } from 'framer-motion';
const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(203, 168, 255) 0%, rgb(162, 119, 255) 100%)', // Pale purple gradient
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&::before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      background:
        'radial-gradient(at center center, rgba(203, 168, 255, 0.6) 0%, rgba(203, 168, 255, 0) 60%)',
    },
    '&::after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      background:
        'radial-gradient(at center center, rgba(162, 119, 255, 0.4) 0%, rgba(162, 119, 255, 0) 70%)',
      transform: 'rotate(30deg)',
    },
  });
  
const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: '50px auto 0 auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayerSlider = () => {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const audioRef = useRef(null);

  const songs = [
    {
      name: "Soul in Seoul",
      artist: "Park Jimin",
      url: song1,
      image: image1,
    },
    {
      name: "Jazz Break",
      artist: "Kim Namjoon",
      url: song2,
      image: image2,
    },
    {
      name: "Cat in the Street",
      artist: "Min Yoongi",
      url: song3,
      image: image3,
    },
    // Add more songs here
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handlePlayPause = () => {
    if (paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPaused(!paused);
  };

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setPosition(0);
    setPaused(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setPosition(0);
    setPaused(true);
  };

  const handleTimeUpdate = () => {
    setPosition(audioRef.current.currentTime);
  };

  const handleSliderChange = (_, value) => {
    setPosition(value);
    audioRef.current.currentTime = value;
  };

  useEffect(() => {
    if (!paused) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
  <WallPaper />
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Widget>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CoverImage>
          <img alt={songs[currentSongIndex].name} src={songs[currentSongIndex].image} />
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {songs[currentSongIndex].artist}
          </Typography>
          <Typography noWrap>
            <b>{songs[currentSongIndex].name}</b>
          </Typography>
        </Box>
      </Box>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onTimeUpdate={handleTimeUpdate}
      />
      {/* Slider and controls */}
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={handleSliderChange}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&::before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === 'dark'
                  ? 'rgb(255 255 255 / 16%)'
                  : 'rgb(0 0 0 / 16%)'
              }`,
            },
            '&.Mui-active': {
              width: 20,
              height: 20,
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: -2,
        }}
      >
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>-{formatDuration(duration - position)}</TinyText>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: -1,
        }}
      >
        <IconButton aria-label="previous song" onClick={handlePrevious}>
          <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
        <IconButton
          aria-label={paused ? 'play' : 'pause'}
          onClick={handlePlayPause}
        >
          {paused ? (
            <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
            />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
          )}
        </IconButton>
        <IconButton aria-label="next song" onClick={handleNext}>
          <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
        </IconButton>
      </Box>
      <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
        <VolumeDownRounded htmlColor={lightIconColor} />
        <Slider
          aria-label="Volume"
          defaultValue={30}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: '#fff',
              '&::before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
        <VolumeUpRounded htmlColor={lightIconColor} />
      </Stack>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <IconButton
          component="a"
          href={songs[currentSongIndex].url}
          download={songs[currentSongIndex].name}
          aria-label="download song"
        >
          <DownloadRounded fontSize="small" htmlColor={mainIconColor} />
        </IconButton>
      </Box>
    </Widget>
  </motion.div>
</Box>
    
  );
};

export default MusicPlayerSlider;
