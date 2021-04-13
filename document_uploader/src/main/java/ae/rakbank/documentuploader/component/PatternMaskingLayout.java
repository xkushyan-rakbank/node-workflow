package ae.rakbank.documentuploader.component;

import ch.qos.logback.classic.PatternLayout;
import ch.qos.logback.classic.spi.ILoggingEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

public class PatternMaskingLayout extends PatternLayout {

    private Pattern multilinePattern;

    private List<String> maskPatterns = new ArrayList<>();

    private final boolean isEnabled;

    PatternMaskingLayout(Boolean isEnable) {
        this.isEnabled = isEnable;
    }

    public PatternMaskingLayout() {
        isEnabled = Boolean.parseBoolean(System.getenv("LOGGER_MASKING_FLAG"));
    }

    public void addMaskPattern(String maskPattern) {
        if (isEnabled) {
            maskPatterns.add(maskPattern);
            multilinePattern = Pattern.compile(
                    String.join("|", maskPatterns),
                    Pattern.MULTILINE
            );
        }
    }

    @Override
    public String doLayout(ILoggingEvent event) {
        return maskMessage(super.doLayout(event));
    }

    private String maskMessage(String message) {
        if (multilinePattern == null) {
            return message;
        }
        StringBuilder sb = new StringBuilder(message);
        Matcher matcher = multilinePattern.matcher(sb);
        while (matcher.find()) {
            IntStream.rangeClosed(1, matcher.groupCount()).forEach(group -> {
                if (matcher.group(group) != null) {
                    IntStream.range(matcher.start(group), matcher.end(group))
                            .forEach(i -> sb.setCharAt(i, '*'));
                }
            });
        }
        return sb.toString();
    }
}
