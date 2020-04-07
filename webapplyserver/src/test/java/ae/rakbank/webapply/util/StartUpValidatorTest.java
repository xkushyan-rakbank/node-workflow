package ae.rakbank.webapply.util;

import ae.rakbank.webapply.stub.ConfigFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.junit.Assert.*;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EnvUtil.class)
public class StartUpValidatorTest {

    private StartUpValidator startUpValidator;

    @Mock
    private FileUtil fileUtil;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        PowerMockito.mockStatic(EnvUtil.class);
        Mockito.when(EnvUtil.getEnv()).thenReturn("local");
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newStartUpValidatioConfig());
        startUpValidator = new StartUpValidator(fileUtil);
    }

    @Test
    public void init() {
        startUpValidator.init();
    }
}