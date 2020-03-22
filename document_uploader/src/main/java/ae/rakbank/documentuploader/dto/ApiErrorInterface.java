package ae.rakbank.documentuploader.dto;

import java.io.Serializable;

public interface ApiErrorInterface extends Serializable {

    long serialVersionUID = 1L;

    String toJsonString();
}
