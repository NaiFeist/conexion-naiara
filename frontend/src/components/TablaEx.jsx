import Topbar from "./Topbar";
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
import { IconButton,Tooltip } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


function TablaEx() {
const userData = useSelector(state => state.login) // ACCEDIENDO A "STORELOGIN" PARA VER SI EL USUARIO ESTA AUTENTICAD O NO
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])

  const isLoggedin = userData.isAutenticated
  const [item, setItem] = useState({ nombre: "", login: "", password: "", rolusu: "" })
  const userRol = userData.rol;
  const isAdmin = userData.userRol === 'admin'; // PARA PONER OTRO ICONO
  
  const resetFields = () => {
    setItem({ nombre: '', login: '', password: '', rolusu: '' });
  }; // PARA DEJAR LOS TEXTFIELD VACIONS CUANDO SE INSERTER ALGO


  useEffect(() => {  // COMPROBAR SI EN HOME EL USUARIO ESTÁ AUTENTICADO
    if (!isLoggedin) {
      navigate('/')
    }

    fetch('http://localhost:3030/getUser')  // DENTRO DEL USEFFECT PARA QUE CUANDO ENTRES A LA PAG ESTE LA TABLA CARGADA
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
    // console.log()
  }
  //Comprobamos por la consola qué obtenemos en userData
  console.log(userData)

  function handleSaveItem(e) {
    e.preventDefault() // PARA QUE NO MANDE FORMMULARIO `POR DEFECTO
    if (item.nombre.length === 0 || item.login.length === 0 || item.password.length === 0 || item.rolusu.length === 0) {
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
    fetch(`http://localhost:3030/addUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rolusu=${item.rolusu}`) // METER VARIABLE -> COMILLA CAMBADA
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

    fetch(`http://localhost:3030/getUser`)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setTableData(response.data)
        }
      })
  }


  const handleDeleteItem = (id) => {
    fetch(`http://localhost:3030/deleteIUser?id=${id}`)
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


    return<>
      <Topbar></Topbar>

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
              label='Login'
              required
              value={item.login}
              onChange={(event) => setItem({ ...item, login: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              label='Password'
              required
              value={item.password}

              onChange={(event) => setItem({ ...item, password: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
            <TextField
              label='Rol'
              required
              value={item.rolusu}

              onChange={(event) => setItem({ ...item, rolusu: event.target.value })}
            >
            </TextField>
          </Grid>
          <Grid item xs={8} md={3}>
          <Tooltip title="Añadir">
            <Button color="primary" variant="contained" type='submit'>
              añadir
            </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Paper>

    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label=" Gestión de Usuarios">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Login</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Rol</TableCell>
            {/* {userData.userRol === 'admin' && (
            <TableCell disabled>Eliminar</TableCell>
            )} */}

          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((rowData) => (
            <TableRow key={rowData.id}>
              <TableCell>{rowData.nombre}</TableCell>
              <TableCell>{rowData.login}</TableCell>
              <TableCell>{rowData.password}</TableCell>
              <TableCell>{rowData.rolusu}</TableCell>
              <TableCell>
              {/* {userData.userRol === 'admin' && (
                <Tooltip title="Borrar">
                <IconButton onClick={() => handleDeleteItem(rowData.id)}>
                  <DeleteForeverIcon />
                </IconButton>
                </Tooltip>
              )} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>

  }
  
  export default TablaEx;