import { Component, Inject, OnInit } from '@angular/core';
import { BackService } from 'src/app/services/back.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list-modale',
  templateUrl: './todo-list-modale.component.html',
  styleUrls: ['./todo-list-modale.component.scss']
})
export class TodoListModaleComponent implements OnInit {


  tacheInfo: FormControl = new FormControl();
  // uneTache!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public tacheModif:any, 
  private _dialogRef: MatDialogRef<TodoListModaleComponent>,
  private _backServ: BackService,
  private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    console.log(this.tacheModif);
    this.tacheInfo.setValue(this.tacheModif.tache)
  }

  onEditTodo(tacheEdit:any) {

//  console.log(tacheEdit);
//  console.log(tacheEdit.tacheModif);
//  console.log(this.tacheModif._id);
console.log(this); //  qui nous sert en parm dans le HTML
console.log(this.tacheInfo.value);

 this._backServ.editTodo(this.tacheModif._id, this.tacheInfo.value).subscribe((retourModale: any) => {
   console.log(retourModale); 

   this._dialogRef.close(
     {
       todo_id: this.tacheModif._id,
       tache : this.tacheInfo.value
     }
     )
      this._snackBar.open('La tâche à été mise-à-jour !', 'Close', {
        duration: 1500
      })
 })
  }

  onCloseModale() {
    this._dialogRef.close()
  }

}
