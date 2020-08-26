import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) {
  }

  public fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public deleteTodo(id: number): Observable<any> {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  public addTodo(payload: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
  }

  public updateTodo(payload: Todo, id: number): Observable<Todo> {
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos/' + id, payload);
  }
}
