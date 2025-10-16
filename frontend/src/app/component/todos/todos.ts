import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.html',
  styleUrl: './todos.css'
})
export class Todos implements OnInit{

  todos : Todo []=[];

  inputTodo: string = '';


  constructor(private todoService: TodoService,private cd :ChangeDetectorRef) { }  
  ngOnInit(): void { 
      // Carga las tareas desde el backend al iniciar
    this.loadTodos();
  }

 loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => (this.todos = data),
      error: (err) => console.error('Error cargando tareas:', err)
    });
  }
   // Cambiar estado completado
  toggleDone(todo: Todo) {
  // Cambio inmediato en la UI
  this.todos = this.todos.map(t =>
    t.id === todo.id ? { ...t, completed: !t.completed } : t
  );

  // Sincronizar con backend (async)
  this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe({
    error: (err) => console.error('Error actualizando tarea:', err)
  });
}

  // Eliminar tarea
  deleteTodo(id: string): void {
      this.todos = this.todos.filter((t) => t.id !== id);
      this.todoService.deleteTodo(id).subscribe({
      error: (err) =>{ 
        console.error('Error eliminando tarea:', err);
        this.loadTodos(); // Recargar tareas desde el backend
    }});
  }

  // Agregar nueva tarea
  addTodo(): void {
  const todoTexto = this.inputTodo.trim();
  if (!todoTexto) return;

  this.todoService.addTodo(todoTexto).subscribe({
    next: (createdTodo) => {
      // Actualiza la lista inmediatamente
      this.todos = [...this.todos, createdTodo];
      this.inputTodo = ''; // Limpia el input
      this.cd.detectChanges(); // Asegura que la UI se actualice
    },
    error: (err) => console.error('Error agregando tarea:', err)
  });
}

    trackById(index: number, todo: Todo): string {
    return todo.id;
  }
}

   
 