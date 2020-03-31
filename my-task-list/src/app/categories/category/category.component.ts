import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})

export class CategoryComponent {

  @Input() description = '';

}
