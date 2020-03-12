package ae.rakbank.webapply.response;

import lombok.Getter;

@Getter
public enum StatusEnum {

    SUCCESS("Y", "Success"),
    FAILED("N", "Failed");

    String code;
    String message;

    StatusEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
