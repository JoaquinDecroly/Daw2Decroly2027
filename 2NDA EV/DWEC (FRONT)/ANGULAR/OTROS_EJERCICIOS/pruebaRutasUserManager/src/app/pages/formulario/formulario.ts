import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserManager } from '../../services/user-manager';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userManager = inject(UserManager);

  isEditing = false;
  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      estado: new FormControl('activo'),
      fechaCreacion: new FormControl('')
    });

    this.route.paramMap.subscribe((params) => {
      const idTexto = params.get('id');
      if (!idTexto) {
        this.isEditing = false;
        this.formulario.reset({
          id: 0,
          nombre: '',
          email: '',
          rol: '',
          departamento: '',
          estado: 'activo',
          fechaCreacion: ''
        });
        return;
      }

      const id = Number(idTexto);
      const usuario = this.userManager.obtenerUsuario(id);
      if (usuario) {
        this.isEditing = true;
        this.formulario.patchValue(usuario);
      } else {
        this.router.navigate(['/usuarios']);
      }
    });
  }

  getData() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const usuario = this.formulario.value as IUsuario;
    this.userManager.agregarUsuario(usuario);
    this.router.navigate(['/usuarios']);
  }
}
