package com.decroly.usuarios.exceptions;

public class PeticionIncorrectaException extends RuntimeException {
    public PeticionIncorrectaException(String mensaje) {
        super(mensaje);
    }
}
