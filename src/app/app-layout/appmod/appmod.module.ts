import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppmodRoutingModule} from './appmod-routing.module';
import { HomePageComponent } from '../../home-page/home-page.component';
import { AdminComponent } from '../../admin/admin.component';
import { CustomerCareComponent } from '../../customer-care/customer-care.component';
import { ReceipientComponent } from '../../receipient/receipient.component';
import { SenderComponent } from '../../sender/sender.component';
import { ServiceProviderComponent } from '../../home-page/service-provider/service-provider.component';


@NgModule({
  declarations: [],
  imports: [
    HomePageComponent,
    AdminComponent,
    CustomerCareComponent,
    ReceipientComponent,
    SenderComponent,
    ServiceProviderComponent,
    CommonModule,
    AppmodRoutingModule
  ]
})
export class AppmodModule { }
