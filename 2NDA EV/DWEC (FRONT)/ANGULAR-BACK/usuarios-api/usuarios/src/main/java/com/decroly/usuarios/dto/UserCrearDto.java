package com.decroly.usuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record UserCrearDto(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
        @Pattern(regexp = "^[\\p{L}\\p{M}][\\p{L}\\p{M} '-]*$",
                 message = "El nombre solo puede contener letras, espacios, apóstrofes y guiones")
        String nombre,

        @NotBlank(message = "El apellido es obligatorio")
        @Size(min = 2, max = 100, message = "El apellido debe tener entre 2 y 100 caracteres")
        @Pattern(regexp = "^[\\p{L}\\p{M}][\\p{L}\\p{M} '-]*$",
                 message = "El apellido solo puede contener letras, espacios, apóstrofes y guiones")
        String apellido,

        @NotBlank(message = "El email es obligatorio")
        @Email(message = "El email no tiene un formato válido")
        @Size(max = 150, message = "El email no puede superar los 150 caracteres")
        String email,

        @NotBlank(message = "La URL de la imagen es obligatoria")
        @URL(protocol = "https", message = "La imagen debe ser una URL válida que utilice HTTPS")
        @Size(max = 500, message = "La URL de la imagen no puede superar los 500 caracteres")
        String imagen
) {
}
