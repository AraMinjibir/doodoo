import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiTab, TuiTabs } from '@taiga-ui/kit';


@Component({
  selector: 'home-page',
  imports: [RouterLink, TuiTabs, TuiButton, NgIf, TuiTab],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  activeTab = null; 
  showTabs = false;


  ngOnInit(){
    this.activatedRoute.fragment.subscribe((data) =>{
      this.jumpToView(data);
    })
  }
  jumpToView(section:any){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }

 
}
