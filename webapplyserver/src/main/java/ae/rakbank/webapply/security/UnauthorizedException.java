package ae.rakbank.webapply.security;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(Throwable cause) {
        super(cause);
    }
}
