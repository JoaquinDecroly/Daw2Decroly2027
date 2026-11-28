package com.decroly.usuarios.services;

import com.decroly.usuarios.dto.UserCrearDto;
import com.decroly.usuarios.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> listar();
    UserDto buscarPorId(Long id);
    UserDto crear(UserCrearDto datos);
    UserDto modificar(Long id, UserCrearDto datos);
    void borrar(Long id);
}
