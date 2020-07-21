import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Card, TextField } from '@material-ui/core';
import styled from '@emotion/styled';

import { useUser } from '../../hooks/useUser';
import { fetchRegisterUser } from '../../api/auth.api';
import AlertSnackbar from '../../components/AlertSnackbar';

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const emailRegex = /[^@]+@[^\.]+\..+/;

interface RegisterForm {
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const { register, errors, handleSubmit } = useForm<RegisterForm>();
  const { authenticateUser } = useUser();
  const [mutate, { isError, error, reset }] = useMutation(fetchRegisterUser);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await mutate(data);
      authenticateUser(response.data);
    } catch (e) {
      //ignored
    }
  };

  return (
    <StyledCard>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="username"
          inputRef={register({ required: 'Username is required' })}
          label="Username"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          name="password"
          inputRef={register({
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          name="email"
          inputRef={register({
            required: 'Email is required',
            pattern: { value: emailRegex, message: 'Email must be valid' },
          })}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button type="submit">Sign in</Button>
      </StyledForm>
      <AlertSnackbar open={isError} message={error?.message} onClose={reset} />
    </StyledCard>
  );
};

export default Register;
