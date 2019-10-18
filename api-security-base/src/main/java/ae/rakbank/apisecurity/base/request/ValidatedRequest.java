package ae.rakbank.apisecurity.base.request;

import com.mastercard.api.core.model.RequestMap;

public class ValidatedRequest {

	private boolean isValid;

	private RequestMap requestMap = new RequestMap();

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public RequestMap getRequestMap() {
		return requestMap;
	}

	public void setRequestMap(RequestMap requestMap) {
		this.requestMap = requestMap;
	}

}
