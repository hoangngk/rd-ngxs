import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext
} from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from './../models/todo';
import { AddTodo, GetTodos, UpdateTodo, DeleteTodo } from './todo.action';
import { TodoApiService } from './todo.api.service';
import { patch, append, updateItem, removeItem } from '@ngxs/store/operators';

export class TodoStateModel {
  public todos: Todo[];
  public selectedTodo: Todo;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    selectedTodo: null
  }
})
@Injectable()
export class TodoState {

  constructor(private todoApiService: TodoApiService) { }

  @Selector()
  static getTodos(state: TodoStateModel): Todo[] {
    return state.todos;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel): Todo {
    return state.selectedTodo;
  }

  @Action(GetTodos)
  public getTodos(stateContext: StateContext<TodoStateModel>): Observable<Todo[]> {
    return this.todoApiService.fetchTodos()
      .pipe(tap(todos => stateContext.setState(patch({ todos }))));
  }

  @Action(AddTodo)
  public addTodo(stateContext: StateContext<TodoStateModel>, { payload }: AddTodo): Observable<Todo> {
    return this.todoApiService.addTodo(payload)
      .pipe(
        tap(todo => stateContext.setState(patch({ todos: append([todo]) })))
      );
  }

  @Action(UpdateTodo)
  public updateTodo(stateContext: StateContext<TodoStateModel>, action: UpdateTodo): Observable<Todo> {
    return this.todoApiService.updateTodo(action.payload, action.id)
      .pipe(tap(todo => {
        stateContext.setState(
          patch({
            todos: updateItem<Todo>(t => t.id === action.id, todo)
          })
        );
      }));
  }

  @Action(DeleteTodo)
  public deleteTodo(stateContext: StateContext<TodoStateModel>, action: DeleteTodo): Observable<any> {
    return this.todoApiService.deleteTodo(action.id)
      .pipe(
        tap(
          () => stateContext.setState(patch({
            todos: removeItem<Todo>(todo => todo.id === action.id)
          }))
        )
      );
  }

}
