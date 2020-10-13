import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

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
      id: 4,
      title: this.todoTitle,
      completed: false,
      editing: false
    });
    this.todoTitle = '';
    this.idForTodo++;
  }

  //Deletes a todo from the list
  deleteTodo(id: number): void {
    console.log(id);
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  
  //Edits a todo item
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true; 
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  //Calculates the number of items left
  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length; 
  }


  //Toggle "Clear Completed" button
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  //Clears completed tasks
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  //Checks all todos
  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked) 
  }

  //Filters todos based on the filter
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

