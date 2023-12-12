import React, { useState,useEffect } from "react";
import Topbar from "./Topbar";
import InformeColeccion from "./InformeColeccion";
import InformeRecu from "./InformeRecu";
import { Button,Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

function Informe() {
  const [informeData, setInformeData] = useState([]); 
  const [mostrarInforme, setMostrarInforme] = useState(false); 
  const [mostrarUsuario, setMostrarUsuario] = useState(false);  // ESTO ES PA MOSTART INFORMERECU
  const navigate = useNavigate();
  const userData = useSelector(state => state.login)
  const isLoggedin = userData.isAutenticated
  const [informePruebas, setInformePruebas] = useState([]);  // ESTE LA TENDRIA QUE CAMBIAR LA VARIAABLE EL  NOMBRE



  useEffect(() => {
  
    if(!isLoggedin) {
        navigate('/')
    }else{
            fetch('http://localhost:3030/getData')
      .then(response => response.json())
      .then(response => {
        if(response) {
            console.log(response)   
            setInformeData(response.data);
                 
        }


      }) 
      // ---------------- aqui es el fetch para la tabla pruea CAMBIAR NOMBRE VARIABLE
      fetch('http://localhost:3030/getPrestamo')   
      .then(response => response.json())
      .then(response => {
        if(response) {
            console.log(response)   
            setInformePruebas(response.data);
                 
        }


      }) 
      .catch(error => console.error('Error', error));
    }

  }, [isLoggedin,navigate])

  const handleInformeClick = () => {
    setMostrarInforme(true);
  }
  const handleInformeUsuario = () => {  // ESTO SERIA CAMBIARLO EN EL EXAMEN, ESTO ES PARA QUE CUANDO APRIETO EL BOTON,SE MUESTRE INFORMERECU
    setMostrarUsuario(true);
  };
  return (
    <>
      <Topbar />
      {mostrarInforme && <InformeColeccion datos={informeData} />}
      
      <Tooltip title="Informe Coleccion">
      <button variant="contained" color="primary" style={{ marginTop: '20px', display: 'block', margin: 'auto', padding: '15px 30px',borderRadius: '8px'}}
        onClick={handleInformeClick}>
        Informe Colección
      </button>
      </Tooltip>
      <Tooltip title="Informe Préstamos">
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: '20px',
            display: 'block',
            margin: 'auto',
            padding: '15px 30px',
            borderRadius: '8px'
          }}
          onClick={handleInformeUsuario}  // ESTO ES PA QUE EL BOTON ME LLEVE A MI INFORMERECU 
        >
          Informe Préstamos
        </Button>
      
      </Tooltip>
      {mostrarUsuario && <InformeRecu datos={informePruebas} />} 
    </>
    
  );
}

export default Informe;
