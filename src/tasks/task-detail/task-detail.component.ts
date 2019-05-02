import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

import 'rxjs/add/operator/switchMap';


import {Task} from '../shared/task.model';
import {TaskService} from '../shared/task.service';

@Component({
  selector: 'app-task-detail',
  moduleId: module.id,
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
  public form: FormGroup;
  public task: Task;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form= this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null],
      done: [null],
      description: [null]
    });
  }

  public ngOnInit(): void {
    this.task = new Task(null, null);

    this.route.params.switchMap((params: Params) => this.taskService.getById(+params['id']))
      .subscribe(
        task => this.setTask(task),
        error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
  }

  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);
  }

  public updateTask(): void {
    this.task.title = this.form.get('title').value;
    this.task.deadline = this.form.get('deadline').value;
    this.task.done = this.form.get('done').value;
    this.task.description = this.form.get('description').value;

    this.taskService.update(this.task).subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente mais tarde.')
    );
  }
}
