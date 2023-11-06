import './App.css';
import Login from './components/Login'; // IMPORTAR PARA USAR COMPONENTE LOGIN
import React from 'react'
import Home from './components/Home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// Naiara Feist Vega
const router = createBrowserRouter([
    {
    path: '/',  // EL PADRE ES LA RAIZ ANTES DE LA BARRA /
    children: [
    {
    index: true,
    element: <Login />
    },
    {
    path: 'home',
    element: <Home /> // ELIGES EL HOME QUE QUIERES VER, PUEDES PONER LOGIN O LO QUE QUIERAS QUE SE VEA
    }
    ]
    }
    ])

function App() { // CREAR FUNCION PRINCIPAL
return (
    <RouterProvider router={router} />

);
}
export default App;

// CREAR FUNCION LOGIN, EXPORTRLA PARA UTILIZAR EN OTRO FICHERO
// SOLO ES PARA PAG DE LOGIN 