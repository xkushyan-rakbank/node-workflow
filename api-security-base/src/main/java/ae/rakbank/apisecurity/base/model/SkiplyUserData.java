package ae.rakbank.apisecurity.base.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Document
@JsonIgnoreProperties(ignoreUnknown = true)
public class SkiplyUserData implements UserDetails{

	@Id
	private String id;
    /**
	 * 
	 */
	private static final long serialVersionUID = 19999L;
	@Field("username")
    private String username;
	@Field("userUUID")
    private UUID userUUID;
    @Field("authorities")
    private Set<GrantedAuthority> authorities;
    @Field("accountNonExpired")
    private boolean accountNonExpired;
    @Field("accountNonLocked")
    private boolean accountNonLocked;
    @Field("credentialsNonExpired")
    private boolean credentialsNonExpired;
    @Field("enabled")
    private boolean enabled;
    @Field("mastercard_id")
	private String mastercardId;
	
	@Field("last_name")
	private String lastName;
	@Field("first_name")
	private String firstName;
	@Field("email_address")
	private String emailAddress;
	@Field("password")
	private String password;
	@Field("phone_number")
	private String phoneNumber;
	@Field("security_question")
	private String securityQuestion;
	@Field("tax_number")
	private String taxNumber;
	@Field("language")
	private String language;
	@Field("country_of_residence")
	private String countryOfResidence;
	@Field("security_question_answer")
	private String securityQuestionAnswer;
	@Field("phone_number_country_code")
	private String phoneNumberCountryCode;
	@Field("profile_photo_url")
	private String profilePhotoUrl;
	@Field("request_zip_in_add_card")
	private String requestZipInAddCard;
	@Field("create_timestamp")
	private String createTimeStamp;
	@Field("update_timestamp")
	private String updateTimeStamp;
	@Field("masterpass_marketing_consent")
	private boolean masterPassMarketingConsent;
	@Field("automatic_email_receipts")
	private boolean automaticEmailReceipts;
	@Field("master_pass_user")
	private boolean masterPassUser;
	@Field("request_cvc_in_add_card")
	private boolean requestCvcInAddCard;
	@Field("marketing_consent")
	private boolean marketingConsent;
	@Field("mastercard_token")
	private String mastercardtoken;
	@Field("internalAccountId")
	private String internalAccountId;
	@Field("mcAccessTokenExpiry")
	private String mcAccessTokenExpiry;
	@Field("image")
	private String image;
	@Field("merchantId")
	private String merchantId;

	public SkiplyUserData(String lastName, String firstName, String emailAddress, String password, String phoneNumber,
			String securityQuestion, String taxNumber, String language, String countryOfResidence,
			String securityQuestionAnswer, String phoneNumberCountryCode, String profilePhotoUrl, String id,
			String requestZipInAddCard, String createTimeStamp, String updateTimeStamp,
			boolean masterPassMarketingConsent, boolean automaticEmailReceipts, boolean masterPassUser,
			boolean requestCvcInAddCard, boolean marketingConsent, String mastercardtoken, String internalAccountId, String mcAccessTokenExpiry, UUID userUUID, String username, Set<GrantedAuthority> authorities, boolean accountNonExpired, boolean accountNonLocked, boolean credentialsNonExpired
			, boolean enabled, String image, String merchantId) {
		super();
		this.lastName = lastName;
		this.firstName = firstName;
		this.emailAddress = emailAddress;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.securityQuestion = securityQuestion;
		this.taxNumber = taxNumber;
		this.language = language;
		this.countryOfResidence = countryOfResidence;
		this.securityQuestionAnswer = securityQuestionAnswer;
		this.phoneNumberCountryCode = phoneNumberCountryCode;
		this.profilePhotoUrl = profilePhotoUrl;
		this.id = id;
		this.requestZipInAddCard = requestZipInAddCard;
		this.createTimeStamp = createTimeStamp;
		this.updateTimeStamp = updateTimeStamp;
		this.masterPassMarketingConsent = masterPassMarketingConsent;
		this.automaticEmailReceipts = automaticEmailReceipts;
		this.masterPassUser = masterPassUser;
		this.requestCvcInAddCard = requestCvcInAddCard;
		this.marketingConsent = marketingConsent;
		this.mastercardtoken = mastercardtoken;
		this.internalAccountId = internalAccountId;
		this.mcAccessTokenExpiry = mcAccessTokenExpiry;
		this.username = username;
        this.userUUID = userUUID;
        this.authorities = authorities;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.image = image;
    	this.merchantId = merchantId;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the emailAddress
	 */
	public String getEmailAddress() {
		return emailAddress;
	}

	/**
	 * @param emailAddress the emailAddress to set
	 */
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the phoneNumber
	 */
	public String getPhoneNumber() {
		return phoneNumber;
	}

	/**
	 * @param phoneNumber the phoneNumber to set
	 */
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	/**
	 * @return the securityQuestion
	 */
	public String getSecurityQuestion() {
		return securityQuestion;
	}

	/**
	 * @param securityQuestion the securityQuestion to set
	 */
	public void setSecurityQuestion(String securityQuestion) {
		this.securityQuestion = securityQuestion;
	}

	/**
	 * @return the taxNumber
	 */
	public String getTaxNumber() {
		return taxNumber;
	}

	/**
	 * @param taxNumber the taxNumber to set
	 */
	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}

	/**
	 * @return the language
	 */
	public String getLanguage() {
		return language;
	}

	/**
	 * @param language the language to set
	 */
	public void setLanguage(String language) {
		this.language = language;
	}

	/**
	 * @return the countryOfResidence
	 */
	public String getCountryOfResidence() {
		return countryOfResidence;
	}

	/**
	 * @param countryOfResidence the countryOfResidence to set
	 */
	public void setCountryOfResidence(String countryOfResidence) {
		this.countryOfResidence = countryOfResidence;
	}

	/**
	 * @return the securityQuestionAnswer
	 */
	public String getSecurityQuestionAnswer() {
		return securityQuestionAnswer;
	}

	/**
	 * @param securityQuestionAnswer the securityQuestionAnswer to set
	 */
	public void setSecurityQuestionAnswer(String securityQuestionAnswer) {
		this.securityQuestionAnswer = securityQuestionAnswer;
	}

	/**
	 * @return the phoneNumberCountryCode
	 */
	public String getPhoneNumberCountryCode() {
		return phoneNumberCountryCode;
	}

	/**
	 * @param phoneNumberCountryCode the phoneNumberCountryCode to set
	 */
	public void setPhoneNumberCountryCode(String phoneNumberCountryCode) {
		this.phoneNumberCountryCode = phoneNumberCountryCode;
	}

	/**
	 * @return the profilePhotoUrl
	 */
	public String getProfilePhotoUrl() {
		return profilePhotoUrl;
	}

	/**
	 * @param profilePhotoUrl the profilePhotoUrl to set
	 */
	public void setProfilePhotoUrl(String profilePhotoUrl) {
		this.profilePhotoUrl = profilePhotoUrl;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the requestZipInAddCard
	 */
	public String getRequestZipInAddCard() {
		return requestZipInAddCard;
	}

	/**
	 * @param requestZipInAddCard the requestZipInAddCard to set
	 */
	public void setRequestZipInAddCard(String requestZipInAddCard) {
		this.requestZipInAddCard = requestZipInAddCard;
	}

	/**
	 * @return the masterPassMarketingConsent
	 */
	public boolean isMasterPassMarketingConsent() {
		return masterPassMarketingConsent;
	}

	/**
	 * @param masterPassMarketingConsent the masterPassMarketingConsent to set
	 */
	public void setMasterPassMarketingConsent(boolean masterPassMarketingConsent) {
		this.masterPassMarketingConsent = masterPassMarketingConsent;
	}

	/**
	 * @return the automaticEmailReceipts
	 */
	public boolean isAutomaticEmailReceipts() {
		return automaticEmailReceipts;
	}

	/**
	 * @param automaticEmailReceipts the automaticEmailReceipts to set
	 */
	public void setAutomaticEmailReceipts(boolean automaticEmailReceipts) {
		this.automaticEmailReceipts = automaticEmailReceipts;
	}

	/**
	 * @return the masterPassUser
	 */
	public boolean isMasterPassUser() {
		return masterPassUser;
	}

	/**
	 * @param masterPassUser the masterPassUser to set
	 */
	public void setMasterPassUser(boolean masterPassUser) {
		this.masterPassUser = masterPassUser;
	}

	/**
	 * @return the requestCvcInAddCard
	 */
	public boolean isRequestCvcInAddCard() {
		return requestCvcInAddCard;
	}

	/**
	 * @param requestCvcInAddCard the requestCvcInAddCard to set
	 */
	public void setRequestCvcInAddCard(boolean requestCvcInAddCard) {
		this.requestCvcInAddCard = requestCvcInAddCard;
	}

	/**
	 * @return the marketingConsent
	 */
	public boolean isMarketingConsent() {
		return marketingConsent;
	}

	/**
	 * @param marketingConsent the marketingConsent to set
	 */
	public void setMarketingConsent(boolean marketingConsent) {
		this.marketingConsent = marketingConsent;
	}

	public SkiplyUserData() {
	}

	public SkiplyUserData(String firstName, String lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return String.format("Customer[ firstName='%s', lastName='%s']",  firstName, lastName);
	}

	public String getCreateTimeStamp() {
		return createTimeStamp;
	}

	public void setCreateTimeStamp(String createTimeStamp) {
		this.createTimeStamp = createTimeStamp;
	}

	public String getUpdateTimeStamp() {
		return updateTimeStamp;
	}

	public void setUpdateTimeStamp(String updateTimeStamp) {
		this.updateTimeStamp = updateTimeStamp;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setUserUUID(UUID userUUID) {
		this.userUUID = userUUID;
	}

	public void setAuthorities(Set<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}


	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}


	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}



	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getMastercardId() {
		return mastercardId;
	}

	public void setMastercardId(String mastercardId) {
		this.mastercardId = mastercardId;
	}

	public String getMastercardtoken() {
		return mastercardtoken;
	}

	public void setMastercardtoken(String mastercardtoken) {
		this.mastercardtoken = mastercardtoken;
	}

	public String getInternalAccountId() {
		return internalAccountId;
	}

	public void setInternalAccountId(String internalAccountId) {
		this.internalAccountId = internalAccountId;
	}

	public String getMcAccessTokenExpiry() {
		return mcAccessTokenExpiry;
	}

	public void setMcAccessTokenExpiry(String mcAccessTokenExpiry) {
		this.mcAccessTokenExpiry = mcAccessTokenExpiry;
	}

	@Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void eraseCredentials() {
        password = null;
    }

    public UUID getUserUUID() {
        return userUUID;
    }

    public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}

	@Override
    public int hashCode() {
        return Objects.hash(password, username, userUUID, authorities, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
    }

	
	

	
}