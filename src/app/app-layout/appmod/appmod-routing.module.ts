import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../home-page/admin/admin.component';
import { CustomerCareComponent } from '../../home-page/customer-care/customer-care.component';
import { ReceipientComponent } from '../../home-page/receipient/receipient.component';
import { SenderComponent } from '../../home-page/sender/sender.component';
import { ServiceProviderComponent } from '../../home-page/service-provider/service-provider.component';
import { HomePageComponent } from '../../home-page/home-page.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home-page',
      pathMatch: 'full',
    },
    {
      path: 'home-page',
      component: HomePageComponent,
    },
    {
      path: 'admin',
      component: AdminComponent,
    },
    {
      path: 'customer',
      component: CustomerCareComponent,
    },
    {
      path: 'receipient',
      component: ReceipientComponent,
    },
    {
      path: 'sender',
      component: SenderComponent,
    },
    {
      path: 'service',
      component: ServiceProviderComponent,
    },
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppmodRoutingModule { }
