import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from 'react';
import { loginActions } from '../store/storelogin';



function Home() {
    //Almacenamos en la variable userData el estado del store
    // Selector LEE LO QUE TIENE GUARDADO EL LOGIN 
    const userData = useSelector(state => state.login)
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const isLoggedin = userData.isAutenticated

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    // FUNCION LOGOUT
    const handleLogout = () => {
        // ACCION LOGOUT PARA CAMBIAR ESTADO
        dispatch(loginActions.logout());
        // VA A LA PAG RAIZ
        navigate('/');
    }
    //Comprobamos por la consola qué obtenemos en userData
    console.log(userData)

    return (
        <div>
            <h1>Página home de Naiara Feist</h1>
            <h2>Nombre de usuario: {userData.userName}</h2>
            <h2>Rol: {userData.userRol}</h2>
            <button onClick={handleLogout}>Salir</button>
        </div>
    );
}
export default Home


// NAVEGAMOS AL HOME CUANDO EL LOGIN ESTÉ CORRECTO 