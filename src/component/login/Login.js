import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Login.css'
import { signIn } from '../../services/handleSignin';
import { useNavigate } from "react-router-dom";
import { Copyright, SnackbarCustom } from '../form/Helper';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
 
const theme = createTheme();

export default function Login() {
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const isLoggedIn = sessionStorage.getItem('isLogIn')
    const [openFailure, setOpenFailure] = React.useState(false);
    const [openPasswordFailure, setOpenPasswordFailure]= React.useState(false);

    React.useEffect(() => {
      console.log(user)
      if(isLoggedIn) {
          navigate('/home');
      }
    }, [user, navigate, isLoggedIn]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var newData = {
        username: data.get('email'),
        password: data.get('password')
      }
      let user = await signIn(newData)
      console.log(user)
      if (user === null || user.id === null || user.id === '') {
        setOpenFailure(true)
      }
      dispatch({type: 'login', payload: user})
    }

    const validateComponent = (event) => {
      const newErrors = validate(event.currentTarget.name, event.currentTarget.value, {...errors});
      setErrors(newErrors);
    }

    const validate = (name, value, newErrors) => {
      let error = '';
      if(!value) {
          error = 'Value required!'
      } else {
          switch(name) {
              case 'email':
                if(!validator.isEmail(value)) {
                    error = 'Please enter a proper Email'
                }
                break;
              default:
                setErrors('Error')
          }
      }
      if(error === '') {
          delete newErrors[name]
      } else {
          newErrors[name] = error;
      }
      return newErrors;
    }

    if(openFailure) {
      setTimeout(() => {
        setOpenFailure(false);
      }, 2000);
    }
    if(openPasswordFailure) {
      setTimeout(() => {
        setOpenPasswordFailure(false);
      }, 2000);
    }

    const handleClose = () => {
      if(openFailure) setOpenFailure(false)
      if(openPasswordFailure) setOpenPasswordFailure(false)
    }

    return (
      <ThemeProvider theme={theme}>
        <SnackbarCustom 
          open={openFailure}
          handleClose={handleClose}
          message={'User not found'}
          severity={'error'}
        />
        <SnackbarCustom 
          open={openPasswordFailure}
          handleClose={handleClose}
          message={'The password or email that is entered is wrong'}
          severity={'error'}
        />
        <Container component="main">
          <PrimarySearchAppBar />
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} width={'60%'}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={validateComponent}
                error={errors.hasOwnProperty('email')}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={validateComponent}
                error={errors.hasOwnProperty('password')}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
}