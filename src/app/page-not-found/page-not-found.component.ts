import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-page-not-found',
  imports: [TuiButton],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  router: Router = inject(Router)
  takeMeHome(){
    this.router.navigate(["home-page"])
  }

}
