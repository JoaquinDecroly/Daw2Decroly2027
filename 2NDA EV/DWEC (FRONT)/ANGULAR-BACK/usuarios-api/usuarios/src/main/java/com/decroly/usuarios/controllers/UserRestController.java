package com.decroly.usuarios.controllers;

import com.decroly.usuarios.dto.UserCrearDto;
import com.decroly.usuarios.dto.UserDto;
import com.decroly.usuarios.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> listar() {
        return ResponseEntity.ok(userService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<UserDto> crear(@Valid @RequestBody UserCrearDto datos) {
        UserDto creado = userService.crear(datos);
        return ResponseEntity
                .created(URI.create("/api/usuarios/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> modificar(
            @PathVariable Long id,
            @Valid @RequestBody UserCrearDto datos
    ) {
        return ResponseEntity.ok(userService.modificar(id, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id) {
        userService.borrar(id);
        return ResponseEntity.noContent().build();
    }
}
