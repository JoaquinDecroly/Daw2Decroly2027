package com.decroly.usuarios.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI usuariosOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("API REST de Usuarios")
                        .description("API para consultar y gestionar usuarios")
                        .version("1.0.0"));
    }
}
