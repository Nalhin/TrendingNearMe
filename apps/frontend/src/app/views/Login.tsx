import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Card, TextField } from '@material-ui/core';
import styled from '@emotion/styled';

import { useUser } from '../hooks/useUser';
import { fetchLoginUser } from '../api/authApi';


const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { authenticateUser } = useUser();
  const [mutate] = useMutation(fetchLoginUser);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await mutate(data);
      authenticateUser(response.data);
    } catch (e) {
    }
  };

  return (
    <StyledCard>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField name="username" inputRef={register} label="Username"/>
        <TextField
          name="password"
          inputRef={register}
          label="Password"
          type="password"
        />
        <Button type="submit">Login</Button>
      </StyledForm>
    </StyledCard>
  );
};

export default Login;
