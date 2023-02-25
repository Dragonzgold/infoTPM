import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IniciarSesion from './Components/IniciarSesion';
import RecuperarPassword from './Components/RecuperarPassword';
import RegistrarUsuario from './Components/RegistrarUsuario';
import NavbarTPM from "./Components/NavbarTPM";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <IniciarSesion />
    },
    {
      path: '/RecuperarPassword',
      element: <RecuperarPassword/>
    },
    {
      path: '/RegistrarUsuario',
      element: <RegistrarUsuario/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
