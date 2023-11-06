import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


// Naiara Feist Vega 

function Login () {

    const [login, setLogin] = useState('')

    const handleSubmit = (e) => {

        // PARA QUE NO MANDE EL FORMU SINO QUE HAGA LO QUE YO DIGA
        e.preventDefault();

        console.log(login) // MOSTRT LO QUE HA PUESTO EL USUARIO
    }
    const handleButtonClick = () => {
        // MOSTRAR ALERTA CUANDO HACE CLICK 
        alert('Click :)');
      } 

return (
    <Container maxWidth = "sm">

        <Box
            component = 'form'
             onSubmit = {handleSubmit}
             style={{ textAlign: 'center' }}
        >   
            <Typography variant="h2">Inicio de Sesión</Typography>

            <TextField
        
                id = 'login'
                label = 'Usuario' // LO QUE SE VE EN EL TXTFIELD
                variant = 'outlined' // TIPO DE TXTFIELD
                fullWidth //QE OCUPE TODO EL ANCHO DEL FORMULARIO
                autoFocus

                value = {login}
                onChange = {(event) => setLogin(event.target.value)}
                
                
            />
    

            <Button
                type = 'submit' 
                variant = 'contained' 
                fullWidth
            >
                 Acceder
            </Button>

</Box>
<Box style = {{ textAlign: 'left' , marginTop: '20px'}}>

</Box>
<Typography variant="h1" component="h2">Naiara Feist</Typography>
<Button color="primary" variant="contained"> Click </Button>


<Typography variant="h1" color="primary">Bienvenida a mi aplicación</Typography>
<Typography variant="h2" color="secondary">Bienvenida a mi aplicación</Typography>
<Typography variant="h3" color="error">Bienvenida a mi aplicación</Typography>

<Button variant="text" color="primary">Texto</Button>
<Button variant="contained" color="secondary">Contenido</Button>
<Button variant="outlined" color="error">Borde </Button>

<Button variant="contained" color="primary" onClick={handleButtonClick}>
        Haz Click aquí!
</Button>
</Container> 

);
}
export default Login;