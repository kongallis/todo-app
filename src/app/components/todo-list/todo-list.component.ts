import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: object[];
  todoTitle: string;
  idForTodo: number;

  constructor() { }

  ngOnInit(): void {
    this.todoTitle = '';
    this.idForTodo = 4;
    this.todos = [
      {
        'id': 1,
        'title': 'Finish Angular Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      },
    ];
  }

  // Adds a todo to the list
  addTodo(): void {

    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: 4,
      title: this.todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = '';
    this.idForTodo++;
  }


}
