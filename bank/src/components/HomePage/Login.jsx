import React, { useState, useContext } from 'react';
import { Grid, Typography, Box, Button, TextField, Alert } from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import handleLogin from './handleLogin';
import { Navigate } from 'react-router-dom';


export default function LetterAvatars() {
  const { auth, setAuth } = useContext(AuthContext)
  const [formValues, setFormValues] = useState({userName : '', userPass : '', errMsg: ''});
  const [hasFailed, setHasFailed] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name] : value
    })
  }
  if(auth?.isAuth) return <Navigate to='/dashboard' />
  return (
    <Box sx={{background : '#cc171d', borderRadius : '12px'}}>
      <Grid container
        sx={{
          placeContent : 'center',
          textAlignLast : 'center'
        }}
      >
        <Grid item sx={{padding : '1em'}} xs={12}>
          <Box
            sx={{
              textAlign: 'center',
              background: 'white',
              padding : '1em',
              borderRadius : '12px'
            }}
          >
            {
              hasFailed && (
                <>
                  <Alert severity="error">{formValues.errMsg}</Alert>
                </>
              )
            }
            <form onSubmit={(e) => handleLogin(e, formValues, setFormValues, setHasFailed, setAuth)}>
              <Box sx={{padding : '1em'}}>
                <TextField
                  type='text'
                  label='User Name'
                  name = 'userName'
                  variant='filled'
                  onChange={handleChange}
                  value={formValues.userName}
                  autoComplete='off'
                  required
                />
              </Box>

              <Box sx={{padding : '1em'}}>
                <TextField
                  type='password'
                  label='Password'
                  name = 'userPass'
                  variant='filled'
                  onChange={handleChange}
                  value={formValues.userPass}
                  required
                />
              </Box>

              <Box sx={{padding : '1em'}}>
                <Button
                  variant='outlined'
                  sx={{color : '#4d818c'}}
                  color='inherit'
                  type='submit'
                >
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>

        <Grid item sx={{padding : '1em'}}>
          <Box
            sx={{
              background : '#4d818c',
              padding : '1em',
              borderRadius : '12px'
            }}
          >
            <Typography
              sx={{
                textAlign : 'center',
                color : 'white',
                padding : '1em'
              }}
            >
              Don't have an account?
            </Typography>

            <Button
              href='/register'
              variant='outlined'
              color='inherit'
              sx={{padding : '.5em', color : 'white'}}
            >
              create an account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}