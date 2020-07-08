import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { fetchRegisterUser } from '@/api/authApi';
import { Button, Card, TextField } from '@material-ui/core';
import { useUser } from '@/hooks/useUser';
import styled from '@emotion/styled';

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
  const [mutate] = useMutation(fetchRegisterUser);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await mutate(data);
      authenticateUser(response.data);
    } catch (e) {}
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
