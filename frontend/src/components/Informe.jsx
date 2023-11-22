import React, { useState,useEffect } from "react";
import Topbar from "./Topbar";
import InformeColeccion from "./InformeColeccion";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

function Informe() {
  const [informeData, setInformeData] = useState([]); 
  const [mostrarInforme, setMostrarInforme] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector(state => state.login)
  const isLoggedin = userData.isAutenticated


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
      .catch(error => console.error('Error', error));
    }

  }, [isLoggedin,navigate])

  const handleInformeClick = () => {
    setMostrarInforme(true);
  };
  return (
    <>
      <Topbar />
      {mostrarInforme && <InformeColeccion datos={informeData} />}
      <button variant="contained" color="primary" style={{ marginTop: '20px', display: 'block', margin: 'auto', padding: '15px 30px',borderRadius: '8px'}}
        onClick={handleInformeClick}>
        Informe Colección
      </button>
    </>
  );
}

export default Informe;
