import { MapView } from '../Pages/Map';
import { Account } from '../Pages/Account';
import { Lines } from '../Pages/Lines';
import { HelpSection } from '../Pages/help';
import { Perfil } from '../Pages/Perfil';

const routes = [
    {
      id: 'Perfil',
      title: 'Perfil',
      path: '/Perfil',
      component: Perfil,
      visibility: false
    },
    {
      id: 'Cuenta',
      title: 'Cuenta',
      path: '/Account',
      component: Account,
      visibility: true
    },
    {
      id: 'Lineas',
      title: 'Lineas',
      path: '/Lines',
      component: Lines,
      visibility: true
    },
    {
      id: 'Ayuda',
      title: 'Ayuda',
      path: '/HelpSection',
      component: HelpSection,
      visibility: true
    },
    {
      id: 'Mapa',
      title: 'Mapa',
      path: '/',
      component: MapView,
      visibility: false
    },
  ];
  
  export default routes;