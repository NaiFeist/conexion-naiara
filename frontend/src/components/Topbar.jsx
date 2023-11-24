import React from 'react';
import { AppBar, Container, Toolbar, Grid, Typography, Button, Tooltip } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/storelogin';

function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.login);
  const isLoggedin = userData.isAutenticated;

  function handleLogout() {
    dispatch(loginActions.logout());
    navigate('/');
  }

  return (
    <AppBar position="static" style={{ padding: '0 16px' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Container>
          <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={3}>
                <Typography variant="h6">{userData.userName}</Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
              <Tooltip title="Inicio">
                <Button color="inherit" component={Link} to="/home">Inicio</Button>
                </Tooltip>
                <Tooltip title="Informe">
                <Button color="inherit" component={Link} to="/informe">Informe</Button>
                </Tooltip>
                <Tooltip title="Ayuda">
                <Button color="inherit" component={Link} to="/ayuda">Ayuda</Button>
                </Tooltip>
                <Tooltip title="Tabla">
                <Button color="inherit" component={Link} to="/tablaex">Tabla</Button>
                {/* <Button color="inherit" component={Link} to="/ayuda">Ayuda</Button> */}
                </Tooltip>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
              <Tooltip title="Salir">
                <Button variant="contained" onClick={handleLogout}>Salir</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </Grid>
    </AppBar>
  );
}

export default Topbar;
