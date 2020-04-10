package ae.rakbank.documentuploader.util;

import ae.rakbank.documentuploader.exception.StartUpException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EnvUtil.class)
public class StartUpValidatorTest {

    @Mock
    private FileUtil fileUtil;

    @Test(expected = StartUpException.class)
    public void testNoVariables() {
        PowerMockito.mockStatic(EnvUtil.class);
        StartUpValidator startUpValidator = new StartUpValidator(fileUtil);
        startUpValidator.init();
    }
}
