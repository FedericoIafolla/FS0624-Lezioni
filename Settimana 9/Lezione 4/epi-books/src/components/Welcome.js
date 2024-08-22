import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container className="mt-5">
      <Alert variant="primary">
        <h1>Welcome to EpiBooks!</h1>
        <p>Your one-stop shop for all your reading needs.</p>
      </Alert>
    </Container>
  );
};

export default Welcome;
