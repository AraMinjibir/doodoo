import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../admin/admin.component';
import { ReceipientComponent } from '../../recipient/recipient.component';
import { SenderComponent } from '../../sender/sender.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { ServiceProviderComponent } from '../../service-provider/service-provider.component';
import { CustomerSupportComponent } from '../../customer-support/customer-support.component';
import { AuthGuard} from '../../Service/auth-guard.service';
import { ContactFormComponent } from '../../contact-form/contact-form.component';

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
      path: 'administrator',
      component: AdminComponent,
      canActivate: [AuthGuard], data:{role: 'Administrator'}
    },
    {
      path: 'customer-support-agent',
      component: CustomerSupportComponent,
      canActivate:[AuthGuard], data:{role: 'Customer Support Agent'}
    },
    {
      path: 'recipient',
      component: ReceipientComponent,
      canActivate:[AuthGuard], data:{role: 'Recipient'}
    },
    {
      path: 'sender',
      component: SenderComponent,
      canActivate: [AuthGuard], data:{role: 'Sender'}
    },
    {
      path: 'service-provider',
      component:ServiceProviderComponent,
      canActivate: [AuthGuard], data:{role: 'Service Provider'}
    },
    {
      path: 'contact-form',
      component: ContactFormComponent
    }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppmodRoutingModule { }
