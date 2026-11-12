package es.decroly.gimnasio.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info( //-----DESCRIPCIÓN SWAGGER-----
        title = "Gimnasio Decroly",
        version = "1.0.0",
        description = "API para gestionar actividades",
        contact = @Contact(
                name = "Joaquín Valentín Ottonello"
        )))
public class OpenApiConfig {
}
