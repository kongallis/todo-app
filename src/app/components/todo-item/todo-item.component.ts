import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  providers: [TodoService],
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todo: Todo;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

}
