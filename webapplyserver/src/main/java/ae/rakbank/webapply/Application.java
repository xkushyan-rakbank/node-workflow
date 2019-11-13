package ae.rakbank.webapply;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import ae.rakbank.webapply.commons.AppConfigProps;
import ae.rakbank.webapply.controllers.ApiRequestForwarder;
import ae.rakbank.webapply.controllers.WebApplyController;

@SpringBootApplication
@EnableConfigurationProperties(AppConfigProps.class)
@EnableScheduling
@ComponentScan({ "ae.rakbank.apisecurity.base", "ae.rakbank.apisecurity.base.filter", "ae.rakbank.apisecurity.base.util"})
@ComponentScan(basePackageClasses = {WebApplyController.class, ApiRequestForwarder.class})
public class Application extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}