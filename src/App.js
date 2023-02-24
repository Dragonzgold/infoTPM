import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import IniciarSesion from './Components/IniciarSesion';
import NavbarTPM from "./Components/NavbarTPM";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <IniciarSesion />
    },
    {
      path: '/no',
      element: <NavbarTPM />
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
