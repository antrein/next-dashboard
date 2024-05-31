'use client';

import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import InputGroupText from 'react-bootstrap/InputGroupText';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const login = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        'https://api.antrein.com/bc/dashboard/auth/login',
        formData
      );
      if (res.status === 200) {
        const data = res.data.data;
        if (data) {
          const { token, tenant } = data;
          Cookies.set('auth', JSON.stringify({ token, tenant }));
          router.push('/project/config');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError((err as any)?.response?.data?.error || err.message);
        toast.error((err as any)?.response?.data?.error || err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Alert
        variant='danger'
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
      <Form onSubmit={login}>
        <InputGroup className='mb-3'>
          <InputGroupText>
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </InputGroupText>
          <FormControl
            type='email'
            name='email'
            required
            disabled={submitting}
            placeholder='Email'
            aria-label='Email'
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroupText>
            <FontAwesomeIcon icon={faLock} fixedWidth />
          </InputGroupText>
          <FormControl
            type='password'
            name='password'
            required
            disabled={submitting}
            placeholder='Password'
            aria-label='Password'
            value={formData.password}
            onChange={handleChange}
          />
        </InputGroup>

        <Row className='align-items-center'>
          <Col xs={6}>
            <Button
              className='px-4'
              variant='primary'
              type='submit'
              disabled={submitting}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Form>
      <Toaster />
    </>
  );
}
