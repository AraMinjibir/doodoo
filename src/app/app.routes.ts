import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home-page',
        pathMatch:'full'
    },
    {
      path: 'home-page',
      component: HomePageComponent,
      
    },
    {
      path: 'home',
      loadChildren: () => import('./home-page/homemod/homemod.module').then((mod) => (mod).HomemodModule)
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
