package ae.rakbank.webapply.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class Status implements Serializable {

    private static final long serialVersionUID = -2949651615866591665L;

    private String message;
    private String code = StatusEnum.SUCCESS.getCode(); // default
    private String errorCode;
    private String apiCode;
    private String internalMessage;
}
