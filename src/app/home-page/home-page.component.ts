import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.activatedRoute.fragment.subscribe((data) =>{
      this.jumpToView(data);
    })
  }
  jumpToView(section:any){
    console.log('do')
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }
}
