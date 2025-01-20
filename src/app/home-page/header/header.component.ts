import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';
import { TuiLink } from '@taiga-ui/core';
import { AuthmodRoutingModule } from '../../authmod/authmod-routing.module';

@Component({
  selector: 'header',
  imports: [TuiLink, AuthmodRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  route: Router = inject(Router);
  navigate(){
    this.route.navigate(["/auth"])
  }
  
}
