package es.decroly.gimnasio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties(prefix="gimnasio")
public record GimnasioProperties(@DefaultValue("Biblioteca Decroly") String nombre,
                                 @DefaultValue("30") int maxPlazas) {
}
