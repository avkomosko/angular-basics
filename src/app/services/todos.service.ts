import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Todo } from '../models/app.interfaces';

@Injectable({providedIn: 'root'})
export class TodoService {
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers: new HttpHeaders({
        'MycustomHeader': Math.random().toString()
      })
    });
  }

  fetchTodos(): Observable<Todo[]> {
    // let params = new HttpParams();
    // params.append('_limit', '4');
    // params.append('custom', 'anything');
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params: new HttpParams().set('_limit', '3'),
      // params,
      observe: 'response'
    }).pipe(
        map(response => {
          return response.body as Todo[]
        }),
        delay(500),
        catchError((e) => {
        return throwError(e);
        })
      );
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      observe: 'events'
    }).pipe(
      tap( event => {

        if (event.type === HttpEventType.Sent) {
          console.log('Sent', event);
        }
        if (event.type === HttpEventType.Response) {
          console.log('Response', event);
        }
      })
    );
  }

  completeTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    }, {
      responseType: 'json'
    });
  }
}
