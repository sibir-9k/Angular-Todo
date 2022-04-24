import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Task } from './components/models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private tasksSubj$ = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubj$.asObservable();

  public constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http
      .get<Task[]>('https://jsonplaceholder.typicode.com/todos/')
      .subscribe((data) => {
        this.tasksSubj$.next(data);
      });
  }

  public createTask(title: string) {
    const tasks: Task[] = [
      { title, id: uuidv4(), completed: false, userId: 1 },
      ...this.tasksSubj$.value,
    ];

    this.tasksSubj$.next(tasks);
  }

  public checkedHandler(taskId: string) {
    const tasks = this.tasksSubj$.value.map((element) => {
      if (taskId === element.id) {
        element.completed = !element.completed;
      }
      return element;
    });

    this.tasksSubj$.next(tasks);
  }

  public deleteTask(taskId: string) {
    const filteredTasks = this.tasksSubj$.value.filter(
      (task) => task.id != taskId
    );
    this.tasksSubj$.next(filteredTasks);
  }
}
