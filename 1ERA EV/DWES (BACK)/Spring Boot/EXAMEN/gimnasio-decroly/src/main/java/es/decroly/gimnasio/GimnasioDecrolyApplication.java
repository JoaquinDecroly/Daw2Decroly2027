package es.decroly.gimnasio;

import es.decroly.gimnasio.config.GimnasioProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(GimnasioProperties.class)
public class GimnasioDecrolyApplication {

    public static void main(String[] args) {
        SpringApplication.run(GimnasioDecrolyApplication.class, args);
    }

}
