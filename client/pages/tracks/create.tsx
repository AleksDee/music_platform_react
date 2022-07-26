import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('text', text.value);
      formData.append('artist', artist.value);
      formData.append('pictire', picture);
      formData.append('audio', audio);
      axios
        .post('http://localhost:5000/tracks', formData)
        .then((resp) => router.push('/tracks'))
        .catch((e) => console.log(e));
    }
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction={'column'} style={{ padding: 20 }}>
            <TextField
              value={name.value}
              onChange={name.onChange}
              style={{ marginTop: 10 }}
              label={'Название трека'}
            />
            <TextField
              value={artist.value}
              onChange={artist.onChange}
              style={{ marginTop: 10 }}
              label={'Имя исполнителя'}
            />
            <TextField
              value={text.value}
              onChange={text.onChange}
              style={{ marginTop: 10 }}
              label={'Слова к треку'}
            />
          </Grid>
        )}

        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        )}

        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
