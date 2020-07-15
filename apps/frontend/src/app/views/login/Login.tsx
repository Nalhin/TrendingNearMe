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
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

type LoginForm = LoginUserDto;

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
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
        <TextField name="username" inputRef={register} label="Username" />
        <TextField
          name="password"
          inputRef={register}
          label="Password"
          type="password"
        />
        <Button type="submit">Login</Button>
      </StyledForm>
      <AlertSnackbar open={isError} message={error?.message} onClose={reset} />
    </StyledCard>
  );
};

export default Login;
