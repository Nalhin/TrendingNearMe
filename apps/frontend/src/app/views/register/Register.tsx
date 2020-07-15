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

interface RegisterForm {
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
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
        <TextField name="username" inputRef={register} label="Username" />
        <TextField
          name="password"
          inputRef={register}
          label="Password"
          type="password"
        />
        <TextField name="email" inputRef={register} label="Email" />
        <Button type="submit">Sign in</Button>
      </StyledForm>
      <AlertSnackbar open={isError} message={error?.message} onClose={reset} />
    </StyledCard>
  );
};

export default Register;
