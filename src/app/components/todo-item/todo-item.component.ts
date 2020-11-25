import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input('todo') todo: Todo;
  @Output() checkedItem = new EventEmitter();
  @Output() doubleClickedItem = new EventEmitter();
  //@Output() blurredItem = new EventEmitter(); 
  //@Output() enteredItem = new EventEmitter();
  @Output() cancelledItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Event Emitters!
  doneEdit(todo: Todo): void {
    this.checkedItem.emit(todo);
  }

  editTodo(todo: Todo): void {
    this.doubleClickedItem.emit(todo);
  }

  cancelEdit(todo: Todo): void {
    this.cancelledItem.emit(todo);
  }

  deleteTodo(todo: Todo): void {
    this.deletedItem.emit(todo.id);
  }

}
