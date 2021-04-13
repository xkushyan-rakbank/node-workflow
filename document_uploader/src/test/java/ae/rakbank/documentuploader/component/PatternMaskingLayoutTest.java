package ae.rakbank.documentuploader.component;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.LoggingEvent;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;
import org.slf4j.LoggerFactory;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class PatternMaskingLayoutTest {

    private PatternMaskingLayout patternMaskingLayoutEnabled;

    private PatternMaskingLayout patternMaskingLayoutDisabled;

    private final static Logger logger = (Logger) LoggerFactory.getLogger(PatternMaskingLayoutTest.class);

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        patternMaskingLayoutEnabled = new PatternMaskingLayout(true);
        patternMaskingLayoutDisabled = new PatternMaskingLayout();

        patternMaskingLayoutEnabled.addMaskPattern("\"password\"\\s*:\\s*\"(.*?)\"");
        patternMaskingLayoutDisabled.addMaskPattern("\"password\"\\s*:\\s*\"(.*?)\"");

        patternMaskingLayoutEnabled.setContext(logger.getLoggerContext());
        patternMaskingLayoutDisabled.setContext(logger.getLoggerContext());

        patternMaskingLayoutEnabled.setPattern("%-5level [%thread]: %message%n");
        patternMaskingLayoutDisabled.setPattern("%-5level [%thread]: %message%n");

        patternMaskingLayoutEnabled.start();
        patternMaskingLayoutDisabled.start();

    }

    @Test
    public void doLayoutIfLayoutEnabled() {

        LoggingEvent loggingEvent = new LoggingEvent();
        loggingEvent.setMessage("\"password\":\"123456789\"");
        loggingEvent.setThreadName("main");
        loggingEvent.setLevel(Level.ALL);

        String result = patternMaskingLayoutEnabled.doLayout(loggingEvent);
        assertNotNull(result);
        assertTrue(result.contains("ALL   [main]: \"password\":\"*********\""));

    }

    @Test
    public void doLayoutIfLayoutWithOtherPattern() {

        LoggingEvent loggingEvent = new LoggingEvent();
        loggingEvent.setMessage("\"passwordNotMasked\":\"123456789\"");
        loggingEvent.setThreadName("main");
        loggingEvent.setLevel(Level.ALL);

        String result = patternMaskingLayoutEnabled.doLayout(loggingEvent);
        assertNotNull(result);
        assertTrue(result.contains("ALL   [main]: \"passwordNotMasked\":\"123456789\""));

    }

    // @Test
    // public void doLayoutIfLayoutDisabled() {

    //     LoggingEvent loggingEvent = new LoggingEvent();
    //     loggingEvent.setMessage("\"password\":\"123456789\"");
    //     loggingEvent.setThreadName("main");
    //     loggingEvent.setLevel(Level.ALL);

    //     String result = patternMaskingLayoutDisabled.doLayout(loggingEvent);
    //     assertNotNull(result);
    //     assertTrue(result.contains("ALL   [main]: \"password\":\"123456789\""));

    // }

}