package ae.rakbank.webapply.stub;

import org.springframework.http.HttpHeaders;

public class HeadersFactory {
    public static HttpHeaders newHttpHeadersForSymKeyEncoding() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("x-sym-key", "34765843658734");
        return httpHeaders;
    }
}
