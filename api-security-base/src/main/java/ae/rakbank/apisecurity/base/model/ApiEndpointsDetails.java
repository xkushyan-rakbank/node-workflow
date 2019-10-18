package ae.rakbank.apisecurity.base.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ApiEndpointsDetails {

	@Id
	private int id;

	private String api;

	private String fieldName;

	private String fieldType;

	private boolean mandatory;

	private int minLength;

	private int maxLength;

	private int minValue;

	private int maxValue;

	private String expression;

	public ApiEndpointsDetails() {

	}

	public ApiEndpointsDetails(int id, String api, String filedName, String fieldType, boolean mandatory, int minLength,
			int maxLength, int minValue, int maxVaue, String expression) {
		super();
		this.id = id;
		this.api = api;
		this.fieldType = fieldType;
		this.fieldName = filedName;
		this.mandatory = mandatory;
		this.minLength = minLength;
		this.maxLength = maxLength;
		this.minValue = minValue;
		this.maxValue = maxVaue;
		this.expression = expression;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApi() {
		return api;
	}

	public void setApi(String api) {
		this.api = api;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public boolean isMandatory() {
		return mandatory;
	}

	public void setMandatory(boolean mandatory) {
		this.mandatory = mandatory;
	}

	public int getMinLength() {
		return minLength;
	}

	public void setMinLength(int minLength) {
		this.minLength = minLength;
	}

	public int getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(int maxLength) {
		this.maxLength = maxLength;
	}

	public int getMinValue() {
		return minValue;
	}

	public void setMinValue(int minValue) {
		this.minValue = minValue;
	}

	public int getMaxValue() {
		return maxValue;
	}

	public void setMaxValue(int maxValue) {
		this.maxValue = maxValue;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ApiEndpointsDetails [id=").append(id).append(", api=").append(api).append(", fieldName=")
				.append(fieldName).append(", fieldType=").append(fieldType).append(", mandatory=").append(mandatory)
				.append(", minLength=").append(minLength).append(", maxLength=").append(maxLength).append(", minValue=")
				.append(minValue).append(", maxValue=").append(maxValue).append(", expression=").append(expression)
				.append("]");
		return builder.toString();
	}

}
