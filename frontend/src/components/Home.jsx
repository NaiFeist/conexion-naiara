import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from 'react';
import { loginActions } from '../store/storelogin';
import { AppBar, Container, Toolbar, Grid, Typography, Button, TextField, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';





function Home() {
  //Almacenamos en la variable userData el estado del store
  // Selector LEE LO QUE TIENE GUARDADO EL LOGIN 
  const userData = useSelector(state => state.login) // ACCEDIENDO A "STORELOGIN" PARA VER SI EL USUARIO ESTA AUTENTICAD O NO
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  const isLoggedin = userData.isAutenticated
  const [item, setItem] = useState({ nombre: "", marca: "", tipo: "", precio: "" })
  const userRol = userData.rol;
  const isAdmin = userData.userRol === 'admin'; // PARA PONER OTRO ICONO
  
  const resetFields = () => {
    setItem({ nombre: '', marca: '', tipo: '', precio: '' });
  }; // PARA DEJAR LOS TEXTFIELD VACIONS CUANDO SE INSERTER ALGO


  useEffect(() => {  // COMPROBAR SI EN HOME EL USUARIO ESTÁ AUTENTICADO
    if (!isLoggedin) {
      navigate('/')
    }

    fetch('http://localhost:3030/getData')  // DENTRO DEL USEFFECT PARA QUE CUANDO ENTRES A LA PAG ESTE LA TABLA CARGADA
      .then(response => response.json())
      .then(data => {
        setTableData(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));

  }, [isLoggedin, navigate])



  // FUNCION LOGOUT
  function handleLogout(e) {
    // ACCION LOGOUT PARA CAMBIAR ESTADO
    dispatch(loginActions.logout());
    // VA A LA PAG RAIZ
    navigate('/');
  }
  //Comprobamos por la consola qué obtenemos en userData
  console.log(userData)

  function handleSaveItem(e) {
    e.preventDefault() // PARA QUE NO MANDE FORMMULARIO `POR DEFECTO
    if (item.nombre.length === 0 || item.marca.length === 0 || item.tipo.length === 0 || item.precio.length === 0) {
      console.log("Datos imcompletos")
    } else {
      handleSubmit(e)
      handleGetItem()
      resetFields()
    }
  }
  function handleSubmit(e) {
    e.preventDefault(); // PAL BOTON DE SUBMIT PA QUE HAGA LO Q YO DIGA
    console.log(item.nombre)
    fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`) // METER VARIABLE -> COMILLA CAMBADA
      .then(response => response.json())
      .then(response => {
        if (response > 0) {
          alert("Operación realizada con éxito")
        } else {
          console.log("Operación fallida :(")
        }
        handleGetItem()
      })


  }
  const handleGetItem = (e) => {

    fetch(`http://localhost:3030/getData`)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setTableData(response.data)
        }
      })
  }


  const handleDeleteItem = (id) => {
    fetch(`http://localhost:3030/deleteItem?id=${id}`)
      .then(response => response.json())
      .then(response => {
        if (response) {
          if (response < 0) {
            alert('Error al borrar datos')
          } else {
            alert('Datos borrados exitosos')
            handleGetItem()
          }

        }
      })
  }


  return <>
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
              <Button color="inherit" component={Link} to="/home">Inicio</Button>
              {userData.userRol === 'admin' && (
                <Button color="inherit" component={Link} to="/informe">Informe</Button>
              )}
              <Button color="inherit" component={Link} to="/ayuda">Ayuda</Button>
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


    <Paper elevation={3}>
      <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
        <Grid container>
          <Grid item xs={8} md={3}>
            <TextField
              label='Nombre'
              required
              value={item.nombre}
              /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el
              atributo nombre del objeto item*/
              onChange={(event) => setItem({ ...item, nombre: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              label='Marca'
              required
              value={item.marca}
              onChange={(event) => setItem({ ...item, marca: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              label='Tipo'
              required
              value={item.tipo}

              onChange={(event) => setItem({ ...item, tipo: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              label='Precio'
              required
              value={item.precio}

              onChange={(event) => setItem({ ...item, precio: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <Button color="primary" variant="contained" type='submit'>
              añadir
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>

    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label="Mi tablita estupenda">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Eliminar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((rowData) => (
            <TableRow key={rowData.id}>
              <TableCell>{rowData.nombre}</TableCell>
              <TableCell>{rowData.marca}</TableCell>
              <TableCell>{rowData.tipo}</TableCell>
              <TableCell>{rowData.precio}</TableCell>
              <TableCell>
              {userData.userRol === 'admin' && (
                <IconButton onClick={() => handleDeleteItem(rowData.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>


}

export default Home


// NAVEGAMOS AL HOME CUANDO EL LOGIN ESTÉ CORRECTO
// <Grid item xs = {8} md={3}>  ESTO ES PA QUE CUANDO SE HAGAH MAS PEQUEÑAS LAS VENTANAS, SE HAGA PEQUEÑO TODO -> VA FUERA DE LOS OTROS GRID