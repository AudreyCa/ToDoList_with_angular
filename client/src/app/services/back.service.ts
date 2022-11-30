import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {

    // Lien avec notre backend :
    backend = "http://localhost:5000/todos"

    constructor(private _http: HttpClient) {}
  
    addTachePost(tache: any): Observable<any> {
      return this._http.post(this.backend, tache)
    }
  
    getAllTodos(): Observable<any> {
      return this._http.get(this.backend)
    }
  
    editTodo(todo_id: any, todo_tache:any): Observable<any> {
      return this._http.put(this.backend + '/' + `${todo_id}`, {"tache": todo_tache})
    }

}
