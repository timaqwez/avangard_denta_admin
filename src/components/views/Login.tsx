import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Box, InputLabel, FormControl, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { AuthProvider } from '../hooks/AuthProvider';
import { BaseIcon } from '../icons/BaseIcon';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [errorTextUsername, setErrorTextUsername] = useState('');
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [errorTextPassword, setErrorTextPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState('none');
  const navigate = useNavigate();

  const handleClickShowPassword = () => ((setShowPassword(!showPassword)));
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('submit')
    setIsErrorUsername(false)
    setErrorTextUsername('')
    setIsErrorPassword(false)
    setErrorTextPassword('')
    try {
      if (username.length < 6) {
        setIsErrorUsername(true)
        setErrorTextUsername("Имя пользователя должно содержать не менее 6 символов")
        setLoading('none')
        return
      }
      if (password.length < 6) {
        setIsErrorPassword(true)
        setErrorTextPassword("Пароль должен содержать не менее 6 символов")
        setLoading('none')
        return
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sessions/create`, {
        username,
        password,
      });
      if (response.data.state === 'successful') {
        Cookies.set('token', response.data.session.token);
        const ApiUrl = import.meta.env.VITE_API_URL
        const get_account_response = await axios.get(ApiUrl + '/admin/accounts/get', {params: {token: Cookies.get('token')} } );
        if (get_account_response.data.state === 'successful') {
          localStorage.setItem('account', JSON.stringify(get_account_response.data.account))
        }
        navigate('/promotions');
        window.location.reload();
      } else {
        if (response.data.error?.code == 1000) {
          setIsErrorUsername(true)
          setErrorTextUsername(`Администратор с именем пользователя ${username} не существует`)
        }
        else if (response.data.error?.code == 2000) {
          setIsErrorPassword(true)
          setErrorTextPassword(`Неверный пароль`)
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            error={isErrorUsername}
            helperText={errorTextUsername}
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormControl sx={{ width: '100%' }} variant="outlined" style={{marginTop: '10px'}}>
          <InputLabel htmlFor="outlined" error={isErrorPassword}>Пароль *</InputLabel>
          <OutlinedInput
            id="outlined"
            autoComplete="disabled"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            error={isErrorPassword}
            margin='none'
            endAdornment={
              <>
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{
                    color: 'primary.main'
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              </>
            }
            label="Пароль"
          />
          <FormHelperText error={isErrorPassword} >{errorTextPassword}</FormHelperText>
        </FormControl>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading == 'submit'}
            disableElevation
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </LoadingButton>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2">
              Нет аккаунта?{' '}
              <Link href="/register" variant="body2">
                Зарегистрироваться
              </Link>
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </Container>
    </AuthProvider>
  );
};

export default Login;
