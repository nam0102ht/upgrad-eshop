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
import './Register.css'
import { signUp } from '../../services/handleSignin';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { Copyright, SnackbarCustom } from '../form/Helper';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';

export default function Register() {
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState({});
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [severity, setSeverity] = React.useState('success')
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const formData = {};
      const newErrors = {...errors};
      for(let [name, value] of data) {
          formData[name] = value;
          validate(name, value, newErrors);
      }
      if(Object.keys(newErrors).length !== 0) {
          setErrors(newErrors);
          let mess = ''
          console.log(newErrors)
          let newKeys = Object.keys(newErrors).map(v => {
            switch (v) {
            case 'email':
                return 'Email'
              case 'password':
                return 'Password'
              case 'confirmPassword':
                return 'Confirm Password'
              case 'firstName':
                return 'First Name'
              case 'lastName':
                return 'Last Name'
              case 'contactNumber':
                return 'Contact Number'
              default:
                return ''
            }
          })
          newKeys.forEach(v => {
            mess = `${mess} '${v}'`
          })
          setMessage(`${mess} is empty or not matched with format`)
          setOpen(true)
          setSeverity('error')
          return;
      }
      if (data.get('password') !== data.get('confirmPassword')) {
        setMessage('Password and Confirm Password are not matched')
        setOpen(true)
        setSeverity('error')
        return
      }
      var signUpData = {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        contactNumber: data.get("contactNumber"),
        role: ['USER']
      }
      let res = await signUp(signUpData, navigate)
      if (res.status) {
        setOpen(true)
        setMessage('Sign up user successfully')
        setSeverity('success')
      } else {
        setMessage('Error')
        setOpen(true)
        setSeverity('error')
      }
    }

    if (message === 'Sign up user successfully') {
      setTimeout(() => {
        setOpen(true)
        setMessage('Please wait a second to direct to login page')
        setSeverity('success')
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }, 2000)
    }
  
    const validateComponent = (event) => {
      const newErrors = validate(event.currentTarget.name, event.currentTarget.value, {...errors});
      setErrors(newErrors)
    }

    const validate = (name, value, newErrors) => {
      let error = '';
      if(!value) {
          error = 'Value required!'
      } else {
          switch(name) {
              case 'email':
                if(value === null || validator.isEmpty(value) || !validator.isEmail(value)) {
                    error = 'Please enter a proper Email'
                }
                break;
              case 'password':
                if(validator.isEmpty(value) || !validator.isStrongPassword(value)) {
                    error = 'Please enter a proper Password'
                }
                break;
              case 'confirmPassword':
                if(validator.isEmpty(value) || !validator.isStrongPassword(value)) {
                    error = 'Please enter a strong password'
                }
                break;
              case 'firstName':
                if(validator.isEmpty(value)) {
                    error = 'Please enter a proper FirstName'
                }
                break;
              case 'lastName':
                if(validator.isEmpty(value)) {
                    error = 'Please enter a proper lastName'
                }
                break;
                case 'contactNumber':
                  if(validator.isEmpty(value) || !validator.isMobilePhone(value)) {
                      error = 'Please enter a correct number'
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

    const handleClose = async (event) => {
      setOpen(false)
    }

    return (
        <Container component="main">
          <PrimarySearchAppBar />
          <CssBaseline />
          <SnackbarCustom 
            open={open}
            handleClose={handleClose}
            message={message}
            severity={severity}
          />
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} width={'60%'}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                error={errors.hasOwnProperty('firstName')}
                onChange={validateComponent}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                error={errors.hasOwnProperty('lastName')}
                onChange={validateComponent}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.hasOwnProperty('enail')}
                onChange={validateComponent}
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
                error={errors.hasOwnProperty('password')}
                onChange={validateComponent}
                autoComplete="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={errors.hasOwnProperty('confirmPassword')}
                onChange={validateComponent}
                autoComplete="confirmPassword"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                name="contactNumber"
                autoComplete="contactNumber"
                error={errors.hasOwnProperty('contactNumber')}
                onChange={validateComponent}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}