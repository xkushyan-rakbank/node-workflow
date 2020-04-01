package ae.rakbank.webapply.exception;

public class StartUpException extends RuntimeException {

    public StartUpException(String message) {
        super(" >>>>>>  The mandatory variables below was not defined: " + message);
    }
}
