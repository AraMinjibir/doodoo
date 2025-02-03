import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
 @Input() isLoading: boolean = false;
}
