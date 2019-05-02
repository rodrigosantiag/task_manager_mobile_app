import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {Task} from './shared/task.model';
import {TaskService} from './shared/task.service';
import * as dialogs from 'tns-core-modules/ui/dialogs';

@Component({
  selector: 'app-tasks',
  moduleId: module.id,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {
  public icons: Map<string, string> = new Map<string, string>();
  public tasks: Array<Task>;
  public newTask: Task;

  public constructor(private taskService: TaskService, private router: Router) {
    this.newTask = new Task(null, '');
    this.setIcons();
  }

  public ngOnInit(): void {
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks.sort((a, b) => b.id - a.id),
        error => alert('Ocorreu um erro no servidor, tente mais tarde')
      );
  }

  public createTask(): void {
    this.newTask.title = this.newTask.title.trim()

    if (!this.newTask.title) {
      alert('A tarefa deve ter um título');
    } else {
      this.taskService.create(this.newTask)
        .subscribe(
          (task) => {
            this.tasks.unshift(task);
            this.newTask = new Task(null, '');
          },
          () => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }

  public deleteTask(task: Task): void {
    dialogs.confirm(`Deseja realmente excluir a tarefa "${task.title}"?`).then(result => {
        if (result) {
          this.taskService.delete(task.id)
            .subscribe(
              () => this.tasks = this.tasks.filter(t => t !== task),
              () => alert('Ocorreu um erro no servidor, tente mais tarde.')
            );
        }
      }
    )
  }

  public taskDone(task: Task) {
    task.done= !task.done;

    this.taskService.update(task).subscribe({
      error: () => {
        task.done = !task.done;
        alert('Ocorreu um erro no servidor, tente mais tarde.');
      }
    })
  }

  public goToTaskDetail(args) {
    let task = this.tasks[args.index];
    this.router.navigate(['/tasks', task.id]);
  }

  private setIcons() {
    this.icons.set('trash', String.fromCharCode(0xf014));
    this.icons.set('add', String.fromCharCode(0xf055));
    this.icons.set('checked', String.fromCharCode(0xf14a));
    this.icons.set('unchecked', String.fromCharCode(0xf096));
  }

  public checkboxIcon(task) {
    return task.done ? this.icons.get('checked') : this.icons.get('unchecked');
  }
}
