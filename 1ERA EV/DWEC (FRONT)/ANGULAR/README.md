<div align="center">

# 🅰️ Comandos Básicos de Angular

### Chuleta de la 1ª Evaluación · DWEC (Front)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

</div>

---

## 📑 Índice

1. [Ruta del repositorio](#-ruta-del-repositorio)
2. [Crear una app Angular](#-crear-una-app-angular)
3. [Entrar en el proyecto](#-entrar-en-el-proyecto)
4. [Abrir en VS Code](#-abrir-en-vs-code)
5. [Instalar Bootstrap](#-instalar-bootstrap)
6. [Configurar `angular.json`](#️-configurar-angularjson)
7. [Instalar dependencias](#-instalar-dependencias)
8. [Levantar el servidor](#-levantar-el-servidor)
9. [Generar componentes](#-generar-componentes)
10. [Resumen rápido](#-resumen-rápido)

---

## 📂 Ruta del repositorio

Ruta de los proyectos Angular de la 1ª evaluación:

```text
C:\Users\daw2\Documents\Daw2Decroly2027\1ERA EV\DWEC (FRONT)
```

---

## 🆕 Crear una app Angular

```bash
ng new nombre-del-proyecto --skip-tests
```

> [!TIP]
> `--skip-tests` evita que se generen los archivos `.spec.ts` de pruebas.

---

## 📁 Entrar en el proyecto

```bash
cd nombre-del-proyecto
```

---

## 💻 Abrir en VS Code

```bash
code .
```

---

## 🎨 Instalar Bootstrap

```bash
npm install bootstrap
```

> [!WARNING]
> El nombre del paquete va **en minúsculas**: `bootstrap`, no `Bootstrap`.

---

## ⚙️ Configurar `angular.json`

Dentro de `architect > build > options`, añade los estilos y el script de Bootstrap.

<table>
<tr>
<th>❌ Antes</th>
<th>✅ Después</th>
</tr>
<tr>
<td>

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  }
],
"styles": [
  "src/styles.css"
]
```

</td>
<td>

```json
"assets": [
  {
    "glob": "**/*",
    "input": "public"
  }
],
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

</td>
</tr>
</table>

> [!NOTE]
> Se usa `bootstrap.bundle.min.js` porque incluye **Popper**, necesario para dropdowns, tooltips y popovers.
> Después de tocar `angular.json` hay que **reiniciar el servidor** (`Ctrl + C` y volver a lanzar `ng s -o`).

---

## 📦 Instalar dependencias

```bash
npm install
```

> [!TIP]
> Imprescindible al clonar un proyecto del repo, ya que la carpeta `node_modules` no se sube a GitHub.

---

## 🚀 Levantar el servidor

```bash
ng s -o
```

| Parte | Significado |
|-------|-------------|
| `ng s` | Abreviatura de `ng serve` |
| `-o` | Abre el navegador automáticamente en `http://localhost:4200` |

---

## 🧩 Generar componentes

```bash
ng generate component components/componente-hijo --type=component --skip-tests
```

Versión corta:

```bash
ng g c components/componente-hijo --type=component --skip-tests
```

| Opción | Qué hace |
|--------|----------|
| `components/` | Crea el componente dentro de la carpeta `components` |
| `--type=component` | Añade el sufijo `.component` a los archivos (`componente-hijo.component.ts`) |
| `--skip-tests` | No genera el archivo `.spec.ts` |

---

## ⚡ Resumen rápido

```bash
# 1. Crear proyecto
ng new mi-app --skip-tests

# 2. Entrar y abrir
cd mi-app
code .

# 3. Bootstrap
npm install bootstrap
#    → editar angular.json (styles + scripts)

# 4. Dependencias
npm install

# 5. Componentes
ng g c components/mi-componente --type=component --skip-tests

# 6. Arrancar
ng s -o
```

---

<div align="center">

Hecho por **[JoaquinDecroly](https://github.com/JoaquinDecroly)** · 2º DAW

</div>
