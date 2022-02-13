import { Component, OnInit } from '@angular/core';
import { Todo } from './models/app.interfaces';
import { TodoService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  loading = false;

  todoTitle = '';

  error = '';

  constructor(private TodoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    };

    this.TodoService.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }

  fetchTodos() {
    this.loading = true;
    this.TodoService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        console.log(error);
        this.error = error.message;
      });
  }

  removeTodo(id: number) {
    this.TodoService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  completeTodo(id: number) {
    this.TodoService.completeTodo(id)
      .subscribe((todo) => {
        this.todos.find(t => t.id === id)!.completed = true;
      })
  }
}
