package ae.rakbank.apisecurity.base.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

    private String key = "random_secret_key";
	private String base64Key = DatatypeConverter.printBase64Binary(key.getBytes());
//	private byte[] secretKey = DatatypeConverter.parseBase64Binary(base64Key);
	ArrayList<String> roles = new ArrayList<String>( Arrays.asList("Admin", "User") );

//    private static final String SECRETKEY = "cust.on.key";
	@Value("${spring.security.jwt.token.expire-length:1200000}")
    private long validityInMilliseconds; // 20 min

	
	 @Autowired private AuthenticationServiceImpl userDetailsService;
	 

//    @Autowired
//    private SecretManager manager;

//    @PostConstruct
//    protected void init() {
//        secretKey = manager.getSecretValue("spring.security.jwt.token.secret-key");
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }

    public String createToken(String username, ArrayList<String> roles) {

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);
        SecretKey secretKey = generalKey();
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey).compact();
    }

	
	 public Authentication getAuthentication(String token) {
		 UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
	  return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities()); 
	  }
	 

    public String getUsername(String token) {
    	String s =  createToken("Admin",roles);
    	SecretKey secretKey = generalKey();
        Claims claimToken = parseJWT(s);
        String ss = claimToken.getSubject();
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(s).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

    public String resolveTokenrequest(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

    public boolean validateToken(String token) throws Exception {
        try {
        	String s =  createToken("Admin",roles);
        	SecretKey secretKey = generalKey();
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(s);

            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new Exception("Expired or invalid JWT token");
        }
    }
    
    public static SecretKey generalKey() {
//        Constant sd = Constant.JWT_SECERT;
        String encodedKey = "custOnboarding.cn";
        byte [] encodeKeyChar = encodedKey.getBytes();
        SecretKey key = new SecretKeySpec(encodeKeyChar, 0, encodeKeyChar.length, "AES");
        return key;
    }
    
    public static Claims parseJWT(String jwt) {
        SecretKey secretKey = generalKey();
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
    }
    

}
