import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-page',
  imports: [],
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
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }
}
