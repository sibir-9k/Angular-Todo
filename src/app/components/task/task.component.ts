import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() taskId!: string;
  @Input() title: string = '';
  @Input() isChecked: boolean = false;

  @Output() deleteTask = new EventEmitter();
  @Output() checkedChange = new EventEmitter();

  public get currentDate() {
    return new Date().toLocaleDateString();
  }
}
