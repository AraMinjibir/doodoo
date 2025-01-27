import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../admin/admin.component';
import { ReceipientComponent } from '../../recipient/recipient.component';
import { SenderComponent } from '../../sender/sender.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { ServiceProviderComponent } from '../../service-provider/service-provider.component';
import { CustomerSupportComponent } from '../../customer-support/customer-support.component';

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
      component: CustomerSupportComponent,
    },
    {
      path: 'recipient',
      component: ReceipientComponent,
    },
    {
      path: 'sender',
      component: SenderComponent,
    },
    {
      path: 'service-provider',
      component:ServiceProviderComponent,
    }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppmodRoutingModule { }
