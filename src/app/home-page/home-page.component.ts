import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SnackBarComponent } from '../Utility/snack-bar/snack-bar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'home-page',
  imports: [RouterLink, SnackBarComponent, NgIf],
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
