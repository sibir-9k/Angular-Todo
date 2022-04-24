import { Component, OnInit, Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Output() createTask = new EventEmitter();

  public inputValue = '';

  public onEnter() {
    if (this.inputValue) {
      this.createTask.emit(this.inputValue);
      this.inputValue = '';
    }
  }
}
