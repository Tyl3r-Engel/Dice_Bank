import React, { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import NavBarMenu from './NavMenu';
import { Grid, Stack } from '@mui/material';
import logo from './logo.png'
import NavUserMenu from './NavUserMenu';


export default function NavBar ({windowWidth}) {
  const { auth } = useContext(AuthContext)

  return (
    <Grid container>
      <Grid item xs={7}>
        <a href={auth.isAuth ? '/dashBoard' : '/'} onClick={(e) => e.preventDefault()}>
          <img src={logo} alt='Logo' height={75}></img>
        </a>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={1} sx={{alignSelf: 'center', textAlign: 'right'}}>
        {((!windowWidth) && (windowWidth !== undefined)) && ( <NavBarMenu /> )}
        {
          auth.isAuth &&
            (
              <Stack direction='row'>
                <NavBarMenu />
                <NavUserMenu />
              </Stack>
            )
        }
      </Grid>
    </Grid>
  )
}