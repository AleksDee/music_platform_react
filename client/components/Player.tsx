import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  pauseTrack,
  playTrack,
  setDuration,
} from '../store/action-creators/player';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

let audio;

const Player = () => {
  // const track: ITrack = {
  //   _id: '1',
  //   name: 'Трек1',
  //   artist: 'Исполнитель 1',
  //   text: 'Какой-то текст',
  //   listens: 5,
  //   picture: 'http://localhost:5000/image/avat.jpg',
  //   audio: 'http://localhost:5000/audio/3495.mp3',
  //   comments: [],
  // };

  const { active, currentTime, duration, pause, volume } = useTypedSelector(
    (state) => state.player
  );

  const { pauseTrack, playTrack, setVolume, setCurrentTime } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
      audio.onloadmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: '0 20px' }}
      >
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      ></TrackProgress>
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress
        left={volume}
        right={100}
        onChange={changeVolume}
      ></TrackProgress>
    </div>
  );
};

export default Player;
