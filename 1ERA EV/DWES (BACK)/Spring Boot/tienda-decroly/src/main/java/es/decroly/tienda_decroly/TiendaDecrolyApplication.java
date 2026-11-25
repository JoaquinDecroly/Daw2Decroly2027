package es.decroly.tienda_decroly;

import es.decroly.tienda_decroly.config.ApisProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class TiendaDecrolyApplication {

		public static void main(String[] args) {
			SpringApplication.run(TiendaDecrolyApplication.class, args);
		}

	}
