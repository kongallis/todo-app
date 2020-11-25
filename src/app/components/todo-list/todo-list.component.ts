import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})

export class TodoListComponent implements OnInit {
  filter: string;
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  todos: Todo[];

  constructor() { }

  ngOnInit(): void {
    this.filter = "all";
    this.todoTitle = '';
    this.idForTodo = 4;
    this.beforeEditCache = '';
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
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = '';
    this.idForTodo++;
  }

  //Deletes a todo from the list
  deleteTodo(id: number): void {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
  }
  
  //Edits a todo item when you double click on todo
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true; 
  }

  // If you leave the todo empty the beforeCache title is filled
  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  // The beforeCache title  is filled when you press the Escape button
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  //Calculates the number of todos left
  remaining(): number {
    return this.todos
    .filter(todo => !todo.completed).length; 
  }


  //Toggle "Clear Completed" button
  atLeastOneCompleted(): boolean {
    return this.todos
    .filter(todo => todo.completed).length > 0;
  }

  //Clears completed tasks
  clearCompleted(): void {
    this.todos = this.todos
    .filter(todo => !todo.completed);
  }

  //Checks all todos to completed
  checkAllTodos(): void {
    this.todos
      .forEach(
        todo => todo.completed = (<HTMLInputElement>event.target)
        .checked) 
  }

  //Filters todos based on selected filter option
  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}

