import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch:'full'
    },
    {
       path:'auth',
       loadChildren: () => import('./authmod/authmod.module').then((mod) => (mod).AuthmodModule)
    },
    // This route should always be the last one.
  {
    path: "**",
    component: PageNotFoundComponent
  }
];
