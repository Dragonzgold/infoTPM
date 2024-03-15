import { MapView } from '../Pages/Map';
import { Account } from '../Pages/Account';
import { Lines } from '../Pages/Lines';
import { Perfil } from '../Pages/Perfil';
import { Register } from '../Pages/Register';
import { Recover } from '../Pages/Recover';
import { HelpSection } from '../Pages/help';
import { Admin } from '../Pages/Admin';
import { VariableEditor } from '../Pages/VariableEditor';
import { Users } from '../Pages/Users';
import { StopsEdit } from '../Pages/StopsEdit';
import { LinesEdit } from '../Pages/LinesEdit';
import { Buses } from '../Pages/Buses';
import { Comments } from '../Pages/Comments';
import { RecoverUpdate } from '../Pages/RecoverUpdate';

const routes = [
  {
    title: 'LinesEdit',
    path: '/LinesEdit',
    component: LinesEdit,
  },
  {
    title: 'StopsEdit',
    path: '/StopsEdit',
    component: StopsEdit,
  },
  {
    title: 'Users',
    path: '/Users',
    component: Users,
  },
  {
    title: 'Users',
    path: '/Users',
    component: Users,
  },
  {
    title: 'VariableEditor',
    path: '/VariableEditor',
    component: VariableEditor,
  },
  {
    title: 'Admin',
    path: '/Admin',
    component: Admin,
  },
  {
    title: 'HelpSection',
    path: '/HelpSection',
    component: HelpSection,
  },
  {
    title: 'Account',
    path: '/Account',
    component: Account,
  },
  {
    title: 'Lines',
    path: '/Lines',
    component: Lines,
  },
  {
    title: 'Register',
    path: '/Register',
    component: Register,
  },
  {
    title: 'Recover',
    path: '/Recover',
    component: Recover,
  },
  {
    title: 'Perfil',
    path: '/Perfil',
    component: Perfil,
  },
  {
    title: 'Buses',
    path: '/Buses',
    component: Buses,
  },
  {
    title: 'Comments',
    path: '/Comments',
    component: Comments,
  },
  {
    title: 'RecoverUpdate',
    path: '/RecoverUpdate/:id/:email',
    component: RecoverUpdate,
  },
  {
    title: 'Map',
    path: '/',
    component: MapView,
  },
];

export default routes;