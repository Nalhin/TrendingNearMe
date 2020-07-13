import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Card, TextField } from '@material-ui/core';
import styled from '@emotion/styled';

import { useUser } from '../hooks/useUser';
import { fetchRegisterUser } from '../api/authApi';

const StyledCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

interface RegisterForm {
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const { authenticateUser, logoutUser } = useUser();
  const [mutate] = useMutation(fetchRegisterUser);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await mutate(data);
      authenticateUser(response.data);
    } catch (e) {
      logoutUser();
    }
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
        <TextField name="email" inputRef={register} label="Email" />
        <Button type="submit">Login</Button>
      </StyledForm>
    </StyledCard>
  );
};

export default Register;
