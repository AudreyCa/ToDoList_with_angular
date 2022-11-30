import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoListModaleComponent } from 'src/app/modals/todo-list-modale/todo-list-modale.component';
import { BackService } from 'src/app/services/back.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taches!: any;
  todoListInput: FormControl = new FormControl();
  backend = "http://localhost:5000/todos"

  constructor(private _backService: BackService, 
    private _http: HttpClient,
    private _dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this._backService.getAllTodos().subscribe((ListeTaches: any) => {
      console.log(ListeTaches);
      this.taches = ListeTaches
    })

  }

  onAdd() {
    // On met la tache, entrée dans l'input, dans une const pour s'en resservir
    const tacheAdd = this.todoListInput.value

    // test : on verifie que je récupère bien la valeur
    console.log(tacheAdd);

    // On le met dans un objet pour le POSTer :
    const message = { tache: tacheAdd }

    // on l'envoie au backend : POST
    this._backService.addTachePost(message).subscribe((tacheSend: any) => {
      try {
        console.log(tacheSend);
        // On efface la fenetre une fois que c'est ajouter
        this.todoListInput.reset()
        // on rafraichit la page pour afficher le résultat
        window.location.href = "/";

      } catch (err: any) {
        console.error(err.message);
      }

    })

  }

  onOpenModale(tache:any): void {
    const modalModifTache = this._dialog.open(TodoListModaleComponent, {
      width: '50%',
      height: '50%',
      enterAnimationDuration:'800ms', 
      exitAnimationDuration:'800ms',
      data: tache
    })

    modalModifTache.afterClosed().subscribe((resultEdit:any) => {
      console.log(resultEdit);
      window.location.href = "/";
    })
  }


  onDelete(id: any) {
    console.warn('ici', id);
    this._http.delete(this.backend + '/' + id).subscribe()
    // on initialise tache pour la filter et n'affiche les données que si l'id existe.
    this.taches = this.taches.filter((todo: any) => {
      todo._id !== id
    })
    window.location.href = "/";
  }

}
