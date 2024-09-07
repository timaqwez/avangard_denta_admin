import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { AuthProvider } from '../hooks/AuthProvider';
import { BaseIcon } from '../icons/BaseIcon';
import { LoadingButton } from '@mui/lab';
import { sessionsOperations } from '../../config/operations/sessions';
import { getInputEntity } from '../inputs/Inputs';

const Login: React.FC = () => {
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState('none');
  const navigate = useNavigate();
  const operations = sessionsOperations;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading('submit')
    setErrors({})
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${operations.create?.path}`, {...form});
      if (response.data.state === 'successful') {
        Cookies.set('token', response.data.session.token);
        const API_URL = import.meta.env.VITE_API_URL
        let get_account_response = await axios.get(API_URL + '/admin/accounts/get', {params: {token: Cookies.get('token')} } );
        if (get_account_response.data.state === 'successful') {
          localStorage.setItem('account', JSON.stringify(get_account_response.data.account))
        }
        navigate('/referrals/add');
        window.location.reload();
      } else {
        if (response.data.error?.code == 1000) {
          let error = operations.create?.errors?.find((error) => error.code === 1000);
          if (error) {
            setErrors({...errors, username: error.message});
          }
        }
        else if (response.data.error?.code == 2000) {
          let error = operations.create?.errors?.find((error) => error.code === 2000);
          if (error) {
            setErrors({...errors, username: error.message});
          }
        }
        setLoading('none')
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <AuthProvider>
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100dvh - 70px)',
          justifyContent: 'center'
        }}
      >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#47997A', marginBottom: '30px'}} key='header-logo'>
            <BaseIcon key='header-logo-icon' height={20}>
                <svg key='header-logo-icon-svg' width="78" height="129" viewBox="0 0 78 129" fill="#47997A" xmlns="http://www.w3.org/2000/svg">
                <path key='header-logo-icon-svg-path' fillRule="evenodd" clipRule="evenodd" d="M73.7781 54.537C79.0166 59.7755 79.0166 68.2691 73.7781 73.5076L23.1914 124.093C17.9532 129.332 9.46013 129.332 4.22171 124.094C-1.01661 118.855 -1.01661 110.362 4.22171 105.124L45.3231 64.0223L4.22171 22.9209C-1.01662 17.6824 -1.01662 9.18969 4.22171 3.95119C9.46012 -1.28732 17.9532 -1.28732 23.1914 3.95119L73.7781 54.537Z"/>
                </svg>
            </BaseIcon>
            <Box key='header-logo-text' sx={{color: '#47997A', fontFamily: 'Quicksand', textWrap: 'nowrap', paddingBottom: {md: '4px', xs: '2px'}, fontSize: { md: '30px', sm: '20px' }, fontWeight: '600', userSelect: 'none'}}>admin.avangard-denta.ru</Box>
        </div>
        <Typography component="h1" variant="h5">
          Вход в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, gap: '10px', display: 'flex', flexDirection: 'column' }}>
          {operations.create?.fields.map((field) => (getInputEntity(
            {...{
              item: form, 
              setItem: setForm,
              errors: errors,
              setErrors: setErrors,
              field: field, 
              handleTextFieldChange: handleTextFieldChange, 
              error: errors[field.dataName], 
              showPassword: showPassword,
              setShowPassword: setShowPassword,
            }}
          )))}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading == 'submit'}
            disableElevation
            sx={{mt: 1}}
          >
            Войти
          </LoadingButton>
        </Box>
      </Box>
    </Container>
    </AuthProvider>
  );
};

export default Login;
