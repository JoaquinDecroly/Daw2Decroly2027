import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interfaces';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-formulario-reactive',
  styleUrl: './formulario-reactive.css',
  templateUrl: './formulario-reactive.html',
})
export class FormularioReactive {

  modelForm: FormGroup;

  constructor(){
    this.modelForm = new FormGroup({
      nombre: new FormControl(null, []),
      email: new FormControl(null, []),
      edad: new FormControl(null, []),
      dni: new FormControl(null, []),
      password: new FormControl(null, []),
      repitePassword: new FormControl(null, [])

    });
  }

  getData() {
    let user = this.modelForm.value as IUser;
    console.log(user);

    this.modelForm.reset();
  }
}
