import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '.././environments/environment'; // 👈 ojo con la ruta
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = `${environment.apiUrl}/tar`;

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  // Agregar una nueva tarea
  addTodo(text: string): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, { text });
  }

  // Actualizar una tarea existente
  updateTodo(id: string, changes: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, changes);
  }

  // Eliminar una tarea
  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
