package com.decroly.usuarios.dto;

public record UserDto(
        Long id,
        String nombre,
        String apellido,
        String email,
        String imagen
) {
}
