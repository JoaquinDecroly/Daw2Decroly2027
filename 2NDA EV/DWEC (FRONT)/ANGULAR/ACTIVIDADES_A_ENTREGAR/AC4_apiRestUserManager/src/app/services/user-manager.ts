import { Service } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interfaces';

@Service()
export class UserManager {
    usuarios:IUsuario[]=[
        {
            id: 1,
            nombre:"AAA",
            apellido:"aaa"
        },
        {
           id: 2,
            nombre:"BBB",
            apellido:"bbb" 
        },
        {
           id: 3,
            nombre:"CCC",
            apellido:"ccc1" 
        },
        {
           id: 4,
            nombre:"DDD",
            apellido:"ddd" 
        }
    ];


    agregarUsuario(usuario:IUsuario){
        this.usuarios.push(usuario);
    }

    eliminarUsuario(id:number){
        const index = this.usuarios.findIndex((u) =>
        u.id === id
        );

        if(index != (-1)){
            this.usuarios.splice(index, 1);
        }
    }


    actualizarUsuario(usuario:IUsuario){
        const index = this.usuarios.findIndex((u) =>
        u.id === usuario.id
        );

        if(index != (-1)){
            this.usuarios.splice(index, 1, usuario);
        }
    }


    existUsuario(id:number):boolean{
        return this.usuarios.some((u) =>
        id === u.id
        );
    }


    obtenerUsuario(id:number){
        return this.usuarios.find((u)=> u.id === id);
    }

}
