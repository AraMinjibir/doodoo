import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app-layout',
        pathMatch:'full'
    },
    {
      path: 'app-layout',
      component: AppLayoutComponent,
      loadChildren: () => import('./app-layout/appmod/appmod.module').then((mod) => (mod).AppmodModule)
      
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
