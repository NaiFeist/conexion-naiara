import React from 'react';
import { AppBar, Container, Toolbar, Grid, Typography, Button, Tooltip } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';
import AdbIcon from '@mui/icons-material/Adb';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';


function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.login);
  const isLoggedin = userData.isAutenticated;
  const isAdmin = userData.userRol === 'admin'; // PARA PONER OTRO ICONO

  function handleLogout() {
    dispatch(loginActions.logout());
    navigate('/');
  }

  return (
    <AppBar position="static" style={{ padding: '0 16px' }}>
    <Grid container alignItems="center" justifyContent="center">
      <Container>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="center">
            {isAdmin ? (
              <Grid item xs={1} md={1} lg={1}>
                <AccessibilityNewIcon />
              </Grid>
            ) : (
              <Grid item xs={1} md={1} lg={1}>
                <AdbIcon />
              </Grid>
            )}  
            <Grid item xs={3} md={3} lg={3}>
              <Typography variant="h6">{userData.userName}</Typography>
            </Grid>
            <Grid item xs={5} md={4} lg={4}>
              <Grid container justifyContent="center">
              <Tooltip title="Inicio">
                <Button color="inherit" component={Link} to="/home">Inicio</Button>
                </Tooltip>
                <Tooltip title="Informe">
                {userData.userRol === 'admin'&& (
  
                  <Button color="inherit" component={Link} to="/informe">Informe</Button>
                )}
                </Tooltip>
                <Tooltip title="Ayuda">
                <Button color="inherit" component={Link}  to="/Feist_Vega_Naiara_UT4A1.pdf" target="_blank">Ayuda </Button>
                </Tooltip>
                <Tooltip title="Gestion">
                {userData.userRol === 'admin' && ( 
                  <Button color="inherit" component={Link} to="/prueba">Gestion de Usuario</Button>
                  )}
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={3} md={4} lg={4} style={{ textAlign: 'right' }}>
              <Button variant="contained" onClick={handleLogout}>Salir</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </Grid>
  </AppBar>
  );
}

export default Topbar;
