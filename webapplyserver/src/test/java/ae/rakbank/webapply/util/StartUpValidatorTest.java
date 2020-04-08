package ae.rakbank.webapply.util;

import ae.rakbank.webapply.exception.StartUpException;
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
    }

    @Test
    public void initValidConfig() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newStartUpValidValidatioConfig());
        startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }

    @Test(expected = StartUpException.class)
    public void initInValidConfig() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newStartUpInValidValidatioConfig());
        startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }

    @Test(expected = StartUpException.class)
    public void initValidConfigWithEmptyProfile() {
        Mockito.when(EnvUtil.getEnv()).thenReturn(null);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newStartUpValidValidatioConfig());
        startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }

    @Test(expected = StartUpException.class)
    public void initValidConfigWithEmptyValue() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newStartUpValidValidatioConfigOnOfValueIsEMpty());
        startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }

    @Test(expected = StartUpException.class)
    public void initValidConfigWithNullConfig() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(null);
        startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }

}