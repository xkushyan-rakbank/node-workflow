package ae.rakbank.webapply.filter;

import org.springframework.http.MediaType;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class HttpServletRequestWritableWrapper extends HttpServletRequestWrapper {

    private final ByteArrayInputStream decryptedDataBAIS;

    public HttpServletRequestWritableWrapper(ServletRequest request, byte[] decryptedData) {
        super((HttpServletRequest) request);
        decryptedDataBAIS = new ByteArrayInputStream(decryptedData);
    }

    @Override
    public String getHeader(String headerName) {
        String headerValue = super.getHeader(headerName);
        if ("Accept".equalsIgnoreCase(headerName) || "Content-Type".equalsIgnoreCase(headerName)) {
            return headerValue.replace(MediaType.TEXT_PLAIN_VALUE, MediaType.APPLICATION_JSON_VALUE);
        }
        return headerValue;
    }

    @Override
    public String getContentType() {
        String contentTypeValue = super.getContentType();
        if (MediaType.TEXT_PLAIN_VALUE.equalsIgnoreCase(contentTypeValue)) {
            return MediaType.APPLICATION_JSON_VALUE;
        }
        return contentTypeValue;
    }

    @Override
    public BufferedReader getReader() throws UnsupportedEncodingException {
        return new BufferedReader(new InputStreamReader(decryptedDataBAIS, StandardCharsets.UTF_8));
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        return new ServletInputStream() {
            @Override
            public int read() {
                return decryptedDataBAIS.read();
            }

            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return false;
            }

            @Override
            public void setReadListener(ReadListener listener) {
                //not used
            }
        };
    }
}
