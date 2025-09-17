import {Routes} from '@angular/router';
import {Home} from './features/home/home';
import {Details} from './features/details/details';
import { MainLayout } from './core/layouts/main-layout';

export const routeConfig: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, title: 'Home page' },
      { path: 'details/:id', component: Details, title: 'Home details' },
    ],
  },
];