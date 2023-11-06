import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux'
//Importamos el componente store que definimos en el fichero ./store/index
import store from './store/index'

 // Naiara Feist Vega 

const  theme = createTheme ( {
  palette: {
    mode: 'light',
    primary: {
      main: '#ef9a9a',
    },
    secondary: {
      main: '#004d40',
    },
    error: {
      main: '#d50000',
      light: '#f70606',
      dark: '#f90606',
      contrastText: '#fbf6f6',
    },
    info: {
      main: '#0a7294',
      dark: '#05536d',
      light: '#1ca0cb',
    },
    background: {
      default: '#00695c',
    },
    text: {
      hint: '#020206',
    },
    warning: {
      main: '#ff3d00',
      light: '#ff3d00',
      dark: '#ff3d00',
    },
    success: {
      main: '#17b51f',
      light: '#0eb315',
      dark: '#0be016',
    },
  },
  typography: {
    fontSize: 15,
    fontWeightLight: 200,
    fontWeightMedium: 600,
    fontWeightBold: 600,
    htmlFontSize: 18,
    h3: {
      fontSize: '2.6rem',
    },
    fontFamily: 'Droid Serif',
    button: {
      fontSize: '1rem',
      fontWeight: 800,
      lineHeight: 1.61,
    },
    caption: {
      fontWeight: 300,
      lineHeight: 1.64,
    },
    overline: {
      lineHeight: 2.35,
      fontWeight: 400,
    },
  },
});

// CSS BASELINE: para normalizar el css en diferentes navegadores

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline/>  
    <ThemeProvider theme = {theme}>
    <Provider store={store}>

    <App />
    </Provider>

    </ThemeProvider>

  </React.StrictMode>
);


reportWebVitals();


// AQUI SE MUESTRA AL APP 