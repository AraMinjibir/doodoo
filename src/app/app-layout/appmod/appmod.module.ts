import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppmodRoutingModule} from './appmod-routing.module';
import { HomePageComponent } from '../../home-page/home-page.component';
import { AdminComponent } from '../../admin/admin.component';
import { ReceipientComponent } from '../../recipient/recipient.component';
import { SenderComponent } from '../../sender/sender.component';
import { ServiceProviderComponent } from '../../service-provider/service-provider.component';
import { CustomerSupportComponent } from '../../customer-support/customer-support.component';
import { ContactFormComponent } from '../../contact-form/contact-form.component';



@NgModule({
  declarations: [],
  imports: [
    HomePageComponent,
    AdminComponent,
   CustomerSupportComponent,
    ReceipientComponent,
    SenderComponent,
    ServiceProviderComponent,
    ContactFormComponent,
    CommonModule,
    AppmodRoutingModule
  ]
})
export class AppmodModule { }
