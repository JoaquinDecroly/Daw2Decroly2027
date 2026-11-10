#PASOS A SEGUIR PARA CONSTRUIR UN REACTIVED FORMS EN ANGULAR
---
1. Importamos FormsModule en el componente formulario

2. Creamos una variable de tipo FormGroup
	[
		modelForm: FormGroup;
	]

3. Creamos un formulario donde se pondrá una etiqueta tipo formGroup (<form action="" [formGroup]="modelForm">)

4. Añadir un listener en el formulario (form) tipo (ngSubmit) [ (ngSubmit)="getData(<xxx>)" ]

5. Añadir a cada input un formControlName, que vendría a ser la relación con la interfaz usada del formulario

6. Se inicializa el FormGroup del punto 2, con los mismos nombres que se han añadido en el punto 5
	[
	this.modelForm = new FormGroup({
      		nombre: new FormControl(null, []),
      		email: new FormControl(null, []),
      		edad: new FormControl(null, []),
      		dni: new FormControl(null, []),
      		password: new FormControl(null, []),
      		repitePassword: new FormControl(null, [])

    	});
	]