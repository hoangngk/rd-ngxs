import { DeleteTodo } from './../../services/todo.action';
import { Store } from '@ngxs/store';
import { Todo } from './../../models/todo';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() public todo: Todo;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  public deleteTodo(id: number): void {
    this.store.dispatch(new DeleteTodo(id));
  }

}
