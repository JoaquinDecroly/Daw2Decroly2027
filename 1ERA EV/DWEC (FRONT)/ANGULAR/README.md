# COMANDOS BÁSICOS ANGULAR 1ERA EV
---

## [RUTA PROYECTOS ANGULAR REPOSITORIO EN 1ERA EV]
C:\Users\daw2\Documents\Daw2Decroly2027\1ERA EV\DWEC (FRONT)

## [CREAR APP ANGULAR]
ng new _______ (--skip-tests)

## [ENTRAR EN PROYECTO]
cd primeraAppAngular\

## [ABRIR PROYECTO ANGULAR EN VSCODE]
code .

## [CONFIGURAR BOOTSTRAP PARA MAQUETAR]
npm install Bootstrap

## [CAMBIAR ANGULAR.JSON]
	//ANTES
	"assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },

	//DESPUES
	"assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css", "node_modules/bootstrap/dist/css/bootstrap.min.css"],
              "scripts": ["node_modules/bootstrap/dist/js/bootstrap.min.js"]
          },


## [INSTALAR NPM]
npm install

## [LEVANTAR SERVIDOR ANGULAR, ABRIENDO LA PANTALLA DIRECTO (-O)]
ng s -o

## [GENERAR COMPONENTES ANGULAR]
ng generate component components/componente-hijo --type=components --skip-tests 


