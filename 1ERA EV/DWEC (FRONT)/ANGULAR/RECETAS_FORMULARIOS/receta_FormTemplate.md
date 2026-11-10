#PASOS A SEGUIR PARA CONSTRUIR UN FORM TEMPLATE EN ANGULAR
---
1-Importamos FormsModule en el componente donde se va a crear el formulario (igual que en el two way data binding)

2- Maquetar el formulario en HTML

3-Ponerle un identificador al formulario (form) en el HTML, [#<formulario>="ngForm"] (cambiar <xxx> por el nombre deseado, ngForm dará error sin el punto 1)

4-Añadir un listener en el formulario (form) tipo (ngSubmit) [ (ngSubmit)="getData(<xxx>)" ]

5-Añadir a los inputs del formulario (ngModel)
	<label for="nombre" class="form-label">Nombre <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="nombre" name="nombre" required minlength="3" ngModel>

6-  La función getData() del punto 4, devuelve un objeto tipo JSON (se puede posteriormente castear con <xxx>.value as …)