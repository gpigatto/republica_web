import React, { Component } from 'react';
import firebase from '../core/firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { firebaseLoginConfig } from '../core/firebaseLoginConfig';
import { loginListener } from './functions/loginListener';

import './login.css';

class Login extends Component {
  componentDidMount() {
    loginListener();
  }

  render() {
    return (
      <div>
        <Grid 
          container 
          component="main" 
          className='root'
        >
          <CssBaseline />
          <Image />
          <Grid 
            item xs={12} 
            sm={8} 
            md={5} 
            component={Paper} 
            elevation={6} 
            square 
            className='paperWrapper'
          >
            <div className='loginPaper'>
              <Avatar className='avatar'>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Form />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function Image() {
  return (
    <Grid 
      item 
      xs={false} 
      sm={4} 
      md={7} 
      className='image' 
    />
  );
}

function Form() {
  return (
    <form className='form' noValidate>
      <StyledFirebaseAuth 
        uiConfig = { firebaseLoginConfig }
        firebaseAuth = { firebase.auth() }
      />
      <Box mt={5}>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center"
        >
          {'Copyright © '}
          <Link 
            color="inherit" 
            href="https://github.com/gpigatto"
          >
            Gabriel Pigatto
          </Link>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </form>
  );
}

export default Login;