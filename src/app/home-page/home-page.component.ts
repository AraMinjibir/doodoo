import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';



@Component({
  selector: 'home-page',
  imports: [RouterLink, TuiButton, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  activeTab: number | null = null; 
  showTabs = false; 

  // Method to select a tab
  selectTab(index: number): void {
    this.activeTab = index; 
  }

  // Method to reset the tabs
  resetTabs(): void {
    this.activeTab = null; 
  }

 
}
