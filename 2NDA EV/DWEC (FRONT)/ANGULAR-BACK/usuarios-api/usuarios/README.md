Te lo dejo corregido para el README, sin credenciales y con la configuración de permisos de MySQL para el usuario `dev`. También mantengo la explicación de la conexión con Angular.

# API REST de Usuarios

API REST desarrollada con Spring Boot 4.2.0, Java 25, Spring Data JPA, MySQL, Lombok y Jakarta Validation.

## Campos del usuario

| Campo    | Tipo   | Reglas                                                                        |
| -------- | ------ | ----------------------------------------------------------------------------- |
| id       | Long   | Autogenerado por MySQL; no se envía al crear o modificar                      |
| nombre   | String | Obligatorio, entre 2 y 100 caracteres; letras, espacios, apóstrofes y guiones |
| apellido | String | Obligatorio, entre 2 y 100 caracteres; letras, espacios, apóstrofes y guiones |
| email    | String | Obligatorio, formato email, máximo 150 caracteres y único                     |
| imagen   | String | Obligatoria, URL HTTPS válida, máximo 500 caracteres                          |

La API devuelve un `UserDto` y recibe un `UserCrearDto`. Así Angular nunca necesita enviar el identificador al crear un usuario.

## 1. Crear la base de datos

Ejecuta en MySQL Workbench o phpMyAdmin:

```
CREATE DATABASE usuarios
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Hibernate creará y actualizará automáticamente la tabla `usuarios` al iniciar la aplicación (`ddl-auto=update`).

## 2. Configurar los permisos de MySQL

La aplicación utiliza un usuario específico llamado `dev` para acceder a la base de datos.

Desde MySQL Workbench, inicia sesión con un usuario administrador y ejecuta:

```
GRANT ALL PRIVILEGES ON usuarios.* TO 'dev'@'%';

FLUSH PRIVILEGES;
```

Esto concede al usuario `dev` todos los permisos sobre las tablas de la base de datos `usuarios`.

Si el usuario todavía no existe, créalo previamente desde MySQL:

```
CREATE USER 'dev'@'%' IDENTIFIED BY 'TU_CONTRASEÑA';
```

Después, ejecuta los comandos `GRANT` y `FLUSH PRIVILEGES` anteriores.

> Importante: la contraseña debe coincidir con la configurada localmente en `application-dev.properties`. No se deben incluir credenciales en el repositorio ni en este README.

## 3. Configurar la conexión

La conexión se configura mediante los archivos de propiedades de Spring Boot:

- `application.properties`: configuración general y selección del perfil activo.
- `application-dev.properties`: configuración para desarrollo local.
- `application-prod.properties`: configuración para producción.

La conexión local utiliza:

- URL: `jdbc:mysql://localhost:3306/usuarios`
- Usuario: `dev`
- Contraseña: configurada localmente.

Para producción se recomienda utilizar variables de entorno:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

También puedes ejecutar `UsuariosApplication` directamente desde IntelliJ IDEA.

## 4. Endpoints

| Método | URL                  | Descripción  | Respuesta |
| ------ | -------------------- | ------------ | --------- |
| GET    | `/api/usuarios`      | Listar todos | 200       |
| GET    | `/api/usuarios/{id}` | Buscar uno   | 200 / 404 |
| POST   | `/api/usuarios`      | Crear        | 201       |
| PUT    | `/api/usuarios/{id}` | Modificar    | 200 / 404 |
| DELETE | `/api/usuarios/{id}` | Eliminar     | 204 / 404 |

## 5. Ejemplo POST / PUT

El cuerpo de la petición no necesita incluir el identificador:

```
{
  "nombre": "Chris",
  "apellido": "Bumstead",
  "email": "chris@example.com",
  "imagen": "https://ejemplo.com/imagen.jpg"
}
```

## 6. Validaciones y errores

- `@NotBlank`: impide valores nulos, vacíos o solo espacios.
- `@Size`: limita la longitud.
- `@Pattern`: limita los caracteres de nombre y apellido.
- `@Email`: comprueba el formato del email.
- `@URL(protocol = "https")`: exige una URL HTTPS válida.
- El servicio comprueba que el email no esté repetido, tanto al crear como al modificar.
- La base de datos también tiene una restricción `UNIQUE` para el email.

El manejador global devuelve errores HTTP en formato `ProblemDetail`. Los errores de validación incluyen un objeto `errores` con los campos que han fallado.

## 7. Swagger

Con la aplicación iniciada:

- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- OpenAPI JSON: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## 8. Integración con Angular

CORS está habilitado para `http://localhost:4200` en las rutas `/api/**`.

La URL base para el servicio Angular es:

```
private apiUrl = 'http://localhost:8080/api/usuarios';
```

La respuesta de la API tiene esta forma:

```
{
  "id": 1,
  "nombre": "Chris",
  "apellido": "Bumstead",
  "email": "chris@example.com",
  "imagen": "https://ejemplo.com/imagen.jpg"
}
```

### Importación inicial de usuarios

Si se utiliza una API externa para obtener usuarios iniciales, Angular puede realizar una importación inicial:

1. Obtener los usuarios de la API externa.
2. Enviar los usuarios a Spring Boot mediante peticiones `POST`.
3. Spring Boot valida los datos y los almacena en MySQL.

Una vez completada la importación, Angular trabajará exclusivamente con la API propia de Spring Boot.

No será necesario volver a consultar la API externa para listar, crear, modificar o eliminar usuarios.

**A partir de ese momento, MySQL será la fuente de datos principal.**