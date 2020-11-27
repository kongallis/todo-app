import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

const API_URL = "https://next.json-generator.com/api/json/get/N1X1siYcY";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  filter: string = 'all';
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [];

  
  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
   }

   // Fetches todos from API 
   getTodos(): Todo[] {
     this.http.get(API_URL)
      .subscribe((response: any) => {
        this.todos = response;})
        return this.todos; 
   }

  // Adds a todo to the list
  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    });
    
    this.idForTodo++;
  }

  //Deletes a todo from the list
  deleteTodo(id: number): void {
    console.log("Inside Delete");
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    this.todos.forEach(x => console.log(x));
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
    this.anyRemainingModel = this.anyRemaining();
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
        .checked); 
    this.anyRemainingModel = this.anyRemaining();
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

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }
}
