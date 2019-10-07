package ae.rakbank.webapply.helpers;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class CookieHelper {

	public void createWebApplyJWT(HttpServletResponse httpResponse) {
		String jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
		// create a cookie
		Cookie cookie = new Cookie("WebApplyJWT", jwtToken);
		cookie.setSecure(true);
		cookie.setHttpOnly(true);

		// add cookie to response
		httpResponse.addCookie(cookie);
	}
}
