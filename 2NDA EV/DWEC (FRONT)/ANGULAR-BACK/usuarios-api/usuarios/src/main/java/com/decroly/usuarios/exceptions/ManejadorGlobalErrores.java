package com.decroly.usuarios.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ManejadorGlobalErrores {

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ProblemDetail noEncontrado(RecursoNoEncontradoException ex) {
        return crearProblema(HttpStatus.NOT_FOUND, "Recurso no encontrado", ex.getMessage());
    }

    @ExceptionHandler(PeticionIncorrectaException.class)
    public ProblemDetail peticionIncorrecta(PeticionIncorrectaException ex) {
        return crearProblema(HttpStatus.BAD_REQUEST, "Petición incorrecta", ex.getMessage());
    }

    @ExceptionHandler(EmailDuplicadoException.class)
    public ProblemDetail emailDuplicado(EmailDuplicadoException ex) {
        return crearProblema(HttpStatus.CONFLICT, "Email duplicado", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ProblemDetail tipoParametroIncorrecto(MethodArgumentTypeMismatchException ex) {
        return crearProblema(
                HttpStatus.BAD_REQUEST,
                "Parámetro incorrecto",
                "El parámetro '" + ex.getName() + "' tiene un formato no válido"
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail datosNoValidos(MethodArgumentNotValidException ex) {
        ProblemDetail problema = crearProblema(
                HttpStatus.BAD_REQUEST, "Datos no válidos",
                "Uno o varios campos no cumplen las validaciones"
        );

        Map<String, String> errores = new LinkedHashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errores.putIfAbsent(error.getField(), error.getDefaultMessage());
        }
        problema.setProperty("errores", errores);
        return problema;
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail jsonIncorrecto(HttpMessageNotReadableException ex) {
        return crearProblema(
                HttpStatus.BAD_REQUEST,
                "JSON incorrecto",
                "El cuerpo de la petición falta o no tiene un formato JSON válido"
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail integridadDatos(DataIntegrityViolationException ex) {
        return crearProblema(
                HttpStatus.CONFLICT,
                "Conflicto de datos",
                "No se pudo guardar el usuario porque alguno de sus datos ya existe o incumple una restricción"
        );
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail errorInterno(Exception ex) {
        log.error("Error interno no controlado en la API", ex);
        return crearProblema(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Error interno",
                "Se ha producido un error inesperado en el servidor"
        );
    }

    private ProblemDetail crearProblema(HttpStatus estado, String titulo, String detalle) {
        ProblemDetail problema = ProblemDetail.forStatusAndDetail(estado, detalle);
        problema.setTitle(titulo);
        problema.setType(URI.create("about:blank"));
        return problema;
    }
}
