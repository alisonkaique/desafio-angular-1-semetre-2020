import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})

export class TaskComponent {

  @Input() description = '';
  @Input() category = '';
  @Input() deadLine = '';
  @Input() status = '';

}
