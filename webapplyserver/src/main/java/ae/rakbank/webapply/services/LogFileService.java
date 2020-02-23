package ae.rakbank.webapply.services;

import ae.rakbank.webapply.util.EnvUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class LogFileService {

    private static final Logger logger = LoggerFactory.getLogger(LogFileService.class);

    @Value("${logging.dir}")
    private String logsDir;
    @Value("${logging.file.name}")
    private String defaultLogFileName;
    @Value("${default.web.apply.dir}")
    private String defaultWebApplyDir;

    public File getLogFile(String fileName) {
        return new File(getLogFilePath(fileName));
    }

    public List getLogFileNameList() {
        File logsFolder = new File(getFolder());
        String[] logsFolderFileList = logsFolder.list();
        if (logsFolderFileList == null) {
            return Collections.emptyList();
        }
        return Arrays.asList(logsFolder.list());
    }

    private String getLogFilePath(String fileName) {
        String logFileName = StringUtils.isNotBlank(fileName) ? fileName : (defaultLogFileName + ".log");
        return getFolder() + "/" + logFileName;
    }

    private String getFolder() {
        String webApplyDir = StringUtils.isNotBlank(EnvUtil.getWebApplyDir()) ? EnvUtil.getWebApplyDir() : defaultWebApplyDir;
        return webApplyDir + "/" + logsDir;
    }
}
