import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { CustomerCareComponent } from '../customer-care/customer-care.component';
import { ReceipientComponent } from '../receipient/receipient.component';
import { SenderComponent } from '../sender/sender.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';

const routes: Routes = [
   {
    path:'admin',
    component: AdminComponent
    
  },
  {
    path:'admin',
    component: AdminComponent
    
  },
  {
    path: 'customer-care',
    component:CustomerCareComponent
  },
  {
    path: 'receipient',
    component:ReceipientComponent
  },
  {
    path: 'sender',
    component:SenderComponent
  },
  {
    path: 'service-provider',
    component:ServiceProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomemodRoutingModule { }
