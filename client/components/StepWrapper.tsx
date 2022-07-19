import {
  Container,
  Step,
  StepLabel,
  Stepper,
  Grid,
  Card,
} from '@material-ui/core';
import React from 'react';

interface StepWrapperProps {
  activeStep: number;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек'];

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <div>
      <Container>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid
          container
          justifyContent="center"
          style={{ margin: '70px 0', height: 270 }}
        >
          <Card>{children}</Card>
        </Grid>
      </Container>
    </div>
  );
};

export default StepWrapper;
