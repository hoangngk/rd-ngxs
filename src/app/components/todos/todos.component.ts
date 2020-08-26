import { Observable } from 'rxjs';
import { TodoState } from './../../services/todo.state';
import { GetTodos } from './../../services/todo.action';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @Select(TodoState.getTodos) public todos: Observable<Todo[]>;

  constructor(
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new GetTodos());
  }

}
