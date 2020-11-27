import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../interfaces/todo'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [TodoService],
})

export class TodoListComponent implements OnInit {
  todoTitle: string;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoTitle = '';
  }

  // // Adds a todo to the list
  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todoService.addTodo(this.todoTitle);

    this.todoTitle = '';

  }

}

