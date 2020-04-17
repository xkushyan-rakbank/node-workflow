package ae.rakbank.documentuploader.config;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AppConfigPropsTest {

    @Autowired
    private AppConfigProps appConfigProps;

    @Test
    public void getLocation() {
        String location = appConfigProps.getLocation();
        assertNotNull(location);
    }

    @Test
    public void setLocation() {
        String newLocation = "someLocation";
        appConfigProps.setLocation(newLocation);
        String location = appConfigProps.getLocation();
        assertEquals(newLocation, location);
    }
}
