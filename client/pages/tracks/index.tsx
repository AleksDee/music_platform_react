import { Button, Card, Grid, Box, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { NextThunkDispatch, wrapper } from '../../store';
import { useDispatch } from 'react-redux';
import { searchTracks } from '../../store/action-creators/track';

export default function Index() {
  const router = useRouter();
  // const tracks: ITrack[] = [
  //   {
  //     _id: '1',
  //     name: 'Трек1',
  //     artist: 'Исполнитель 1',
  //     text: 'Какой-то текст',
  //     listens: 5,
  //     picture: 'http://localhost:5000/image/avat.jpg',
  //     audio: 'http://localhost:5000/audio/3495.mp3',
  //     comments: [],
  //   },
  //   {
  //     _id: '2',
  //     name: 'Трек2',
  //     artist: 'Исполнитель 2',
  //     text: 'Какой-то текст',
  //     listens: 5,
  //     picture: 'http://localhost:5000/image/avat.jpg',
  //     audio: 'http://localhost:5000/audio/3495.mp3',
  //     comments: [],
  //   },
  //   {
  //     _id: '3',
  //     name: 'Трек3',
  //     artist: 'Исполнитель 3',
  //     text: 'Какой-то текст',
  //     listens: 5,
  //     picture: 'http://localhost:5000/image/avat.jpg',
  //     audio: 'http://localhost:5000/audio/3495.mp3',
  //     comments: [],
  //   },
  // ];

  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      })
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search}></TextField>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
  }
);
function fetchTracks(): any {
  throw new Error('Function not implemented.');
}
