package ae.rakbank.webapply;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import ae.rakbank.webapply.commons.AppConfig;

@SpringBootApplication
@EnableConfigurationProperties(AppConfig.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}