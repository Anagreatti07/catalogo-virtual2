import React from 'react';
import ReactDOM from 'react-dom/client';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Filmes from './Filmes';

const theme =  createTheme({
  palette: {
      mode: 'light',
      primary: {
        main: '#66bcc7',
      },
      secondary: {
        main: '#197e8c',
      },
      background: {
        default: '#fff',
        paper: '#d2d0d0',
      },
      text: {
        primary: 'rgba(0,0,0,0.87)',
      },
    },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/filmes",
    element: <Filmes/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router}/>
  </ThemeProvider>
);

