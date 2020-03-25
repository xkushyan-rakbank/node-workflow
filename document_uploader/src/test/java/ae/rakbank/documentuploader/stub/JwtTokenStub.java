package ae.rakbank.documentuploader.stub;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.stub.util.JwtTestUtil;

import java.time.LocalDateTime;

public class JwtTokenStub {

    public static final String TEST_ACCESS_TOKEN = "some OAuth token";
    public static final String TEST_REFRESH_TOKEN = "some OAuth refresh token";
    public static final String TEST_PHONE_NUMBER = "123456789";
    public static final String TEST_PROSPECT_ID = "ABCD000";
    public static final LocalDateTime TEST_EXPIRATION_TIME = LocalDateTime.now().plusHours(1);

    private static final String INVALID_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9" +
            ".eyJPQXV0aFRva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SlBRWFYwYUZSdmEy" +
            "VnVJam9pZUhoNGVIZ2lMQ0pQUVhWMGFGSmxabkpsYzJoVWIydGxiaUk2SWpreFJEa3pNVUl6TWpnNE1URXlPVUl3T" +
            "WtNMVFUaEJNVVZGT1RFd05EQTBSalUyTlRjMlJrUWlmUS5rcThoTmh0ZDN1bG85R1lFbEI5Q3hYRU52WlpWSWcxLX" +
            "NydVFReFdyUG5zIiwicHJvc3BlY3RJZCI6IkNPU01FMDAwMDAwMDAwMDAwMDAwMSIsInJvbGUiOiJDVVNUT01FUiI" +
            "sInBob25lTnVtYmVyIjoiMDEyMzQ1Njc4OSIsIk9BdXRoUmVmcmVzaFRva2VuIjoiOTFEOTMxQjMyODgxMTI5QjAy" +
            "QzVBOEExRUU5MTA0MDRGNTY1NzZGRCIsIm9hdXRoVG9rZW5FeHBpcnlUaW1lIjoiMjAyMC0wMy0xMVQxMzowMDo1Mi4zMzkifQ" +
            ".f-hfwIr3w1RvEVXroRvkAjnsf6vKWvRmXBRF-lJLyJY";

    private static final String ENCRYPTED_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJPQXV0aFRva2VuIjoiYWNjZXNzLX" +
            "Rva2VuIiwicm9sZSI6IkNVU1RPTUVSIiwicGhvbmVOdW1iZXIiOiIxMjM0MTIzNDEiLCJPQXV0aFJlZnJlc2hUb2tlbiI6InJlZnJlc2" +
            "gtdG9rZW4iLCJvYXV0aFRva2VuRXhwaXJ5VGltZSI6IjIwMjAtMDEtMDFUMDA6MDAifQ.sFO0vQ4rbbGTIB31QRZhDb7By7886DmBU-cCEbRAEug";

    private static final String ENCRYPTED_TOKEN_WITHOUT_ROLE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6" +
            "IjEyMzQxMjM0MSIsIm9hdXRoVG9rZW5FeHBpcnlUaW1lIjoiMjAyMC0wMS0wMVQwMDowMCJ9.Ewda0v4WSuR1RXW_EChZHPgr2Hlybosd8BteBS2Ozj8";

    public static String getEncryptedToken() {
        return ENCRYPTED_TOKEN;
    }

    public static String getEncryptedTokenWithoutRole() {
        return ENCRYPTED_TOKEN_WITHOUT_ROLE;
    }

    public static String getCustomerJwtTokenWithProspect(String prospectId) {
        JwtPayload jwtPayload = JwtPayload.builder()
                .oauthAccessToken(TEST_ACCESS_TOKEN)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .role(UserRole.CUSTOMER)
                .phoneNumber(TEST_PHONE_NUMBER)
                .prospectId(prospectId)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getAgentJwtTokenWithoutProspect() {
        JwtPayload jwtPayload = JwtPayload.builder()
                .oauthAccessToken("some OAuth token")
                .oauthRefreshToken("some OAuth refresh token")
                .role(UserRole.AGENT)
                .phoneNumber("")
                .prospectId("")
                .oauthTokenExpiryTime(LocalDateTime.now().plusHours(1))
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getCustomerJwtTokenStub() {

        JwtPayload jwtPayload = JwtPayload.builder()
                .role(UserRole.CUSTOMER)

                .oauthAccessToken(TEST_ACCESS_TOKEN)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .phoneNumber(TEST_PHONE_NUMBER)
                .prospectId(TEST_PROSPECT_ID)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getAgentJwtTokenStub() {

        JwtPayload jwtPayload = JwtPayload.builder()
                .role(UserRole.AGENT)

                .oauthAccessToken(TEST_ACCESS_TOKEN)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .phoneNumber(null)
                .prospectId(null)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getNoRoleJwtTokenStub() {

        JwtPayload jwtPayload = JwtPayload.builder()
                .role(null)

                .oauthAccessToken(TEST_ACCESS_TOKEN)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .phoneNumber(TEST_PHONE_NUMBER)
                .prospectId(TEST_PROSPECT_ID)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getCustomerNoPhoneJwtTokenStub() {

        JwtPayload jwtPayload = JwtPayload.builder()
                .role(UserRole.CUSTOMER)

                .oauthAccessToken(TEST_ACCESS_TOKEN)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .phoneNumber(null)
                .prospectId(TEST_PROSPECT_ID)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getAgentNoAccessJwtTokenStub() {

        JwtPayload jwtPayload = JwtPayload.builder()
                .role(UserRole.AGENT)

                .oauthAccessToken(null)
                .oauthRefreshToken(TEST_REFRESH_TOKEN)
                .phoneNumber(null)
                .prospectId(null)
                .oauthTokenExpiryTime(TEST_EXPIRATION_TIME)
                .build();

        return JwtTestUtil.encrypt(jwtPayload);
    }

    public static String getInvalidTokenStub() {
        return INVALID_TOKEN;
    }
}
