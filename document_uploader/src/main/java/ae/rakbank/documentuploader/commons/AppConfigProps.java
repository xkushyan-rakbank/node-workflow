package ae.rakbank.documentuploader.commons;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties
public class AppConfigProps {

	private String location;

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}