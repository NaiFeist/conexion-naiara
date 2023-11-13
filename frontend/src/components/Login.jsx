import React, { useState } from 'react';
import { Grid, Paper, Avatar, Typography, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
//Importamos el componente loginActions que está en el fichero storelogin.js
import { loginActions } from '../store/storelogin';

const Login = () => {
  const navigate = useNavigate()  // SIEMPRE SE DEFINE AL PRINCIPIO
  const dispatch = useDispatch()


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isVerifiedUser = () => {  // ESTO ES DENTRO DE LA BD YA
    fetch(`http://localhost:3030/login?user=${username}&password=${password}`) // METER VARIABLE -> COMILLA CAMBADA
    .then(response => response.json())
    .then(response => {
      if (response) {
        if(Object.keys(response.data).length === 0) { // DEL OBJ(RESPONSE)Y  CLAVE ( DATA )  TAMAÑO  AQUI YA MIRAMOS EN LA BD
          console.log('Datos Incorrectos') //esto es simplemente un mensaje para ver si entré en el if

        }else{
          dispatch(loginActions.login({  // DISPATCH PARA PONER DATOS 
            name: response.data.nombre,
            rol: response.data.rol
            }))
          navigate('/home')
                //console.log(response)  
        }

      }
    })
    
  }

  const handleSubmit = (e) => {  // AL APRETAR EL BOTON
    e.preventDefault();

    if (username == '' || password == '') {
      console.log('Campos vacios')
    } else {

    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al backend
    isVerifiedUser()   // IMPORTARLO AQUI 
  }
};

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Paper sx={{ margin: 'auto', padding: 2 }} elevation={6}>
        <Avatar sx={{ backgroundColor: 'primary.main', margin: 'auto' }}>
          <img src="/images/login.png" alt="Avatar" />
        </Avatar>
        <Typography variant="h5" sx={{ textAlign: 'center', margin: 2 }}>
          Acceder
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acceder
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
