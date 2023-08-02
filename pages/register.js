// pages/register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/authenticate';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(username, password, password2);
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
