package com.decroly.usuarios.services;

import com.decroly.usuarios.dto.UserCrearDto;
import com.decroly.usuarios.dto.UserDto;
import com.decroly.usuarios.exceptions.EmailDuplicadoException;
import com.decroly.usuarios.exceptions.PeticionIncorrectaException;
import com.decroly.usuarios.exceptions.RecursoNoEncontradoException;
import com.decroly.usuarios.model.User;
import com.decroly.usuarios.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceJpa implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> listar() {
        return userRepository.findAll()
                .stream()
                .map(this::convertirADto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto buscarPorId(Long id) {
        validarId(id);
        return convertirADto(buscarEntidad(id));
    }

    @Override
    public UserDto crear(UserCrearDto datos) {
        comprobarEmailDisponible(datos.email(), null);

        User user = new User();
        copiarDatos(datos, user);

        return convertirADto(userRepository.save(user));
    }

    @Override
    public UserDto modificar(Long id, UserCrearDto datos) {
        validarId(id);

        User user = buscarEntidad(id);
        comprobarEmailDisponible(datos.email(), id);
        copiarDatos(datos, user);

        return convertirADto(userRepository.save(user));
    }

    @Override
    public void borrar(Long id) {
        validarId(id);
        User user = buscarEntidad(id);
        userRepository.delete(user);
    }

    private User buscarEntidad(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "No existe ningún usuario con el id " + id
                ));
    }

    private void comprobarEmailDisponible(String email, Long idActual) {
        boolean existe = idActual == null
                ? userRepository.existsByEmail(email)
                : userRepository.existsByEmailAndIdNot(email, idActual);

        if (existe) {
            throw new EmailDuplicadoException("Ya existe un usuario con el email " + email);
        }
    }

    private void validarId(Long id) {
        if (id == null || id <= 0) {
            throw new PeticionIncorrectaException("El id debe ser un número positivo");
        }
    }

    private void copiarDatos(UserCrearDto datos, User user) {
        user.setNombre(datos.nombre().trim());
        user.setApellido(datos.apellido().trim());
        user.setEmail(datos.email().trim().toLowerCase());
        user.setImagen(datos.imagen().trim());
    }

    private UserDto convertirADto(User user) {
        return new UserDto(
                user.getId(),
                user.getNombre(),
                user.getApellido(),
                user.getEmail(),
                user.getImagen()
        );
    }
}
