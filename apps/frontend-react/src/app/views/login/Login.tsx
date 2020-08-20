import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Card, TextField } from '@material-ui/core';
import styled from '@emotion/styled';

import { LoginUserDto } from '@trends/data';

import { useUser } from '../../hooks/useUser';
import { fetchLoginUser } from '../../api/auth.api';
import AlertSnackbar from '../../components/AlertSnackbar';

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 48px auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

type LoginForm = LoginUserDto;

const Login = () => {
  const { register, errors, handleSubmit } = useForm<LoginForm>();
  const { authenticateUser } = useUser();
  const [mutate, { isError, error, reset }] = useMutation(fetchLoginUser, {
    onSuccess: (response) => {
      authenticateUser(response.data);
    },
  });

  const onSubmit = async (data: LoginForm) => {
    await mutate(data);
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
        <Button type="submit">Login</Button>
      </StyledForm>
      <AlertSnackbar open={isError} message={error?.message} onClose={reset} />
    </StyledCard>
  );
};

export default Login;
