//package ae.rakbank.apisecurity.base.conf;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import ae.rakbank.apisecurity.base.security.AuthenticationServiceImpl;
//import ae.rakbank.apisecurity.base.security.JwtConfigurer;
//import ae.rakbank.apisecurity.base.security.JwtTokenProvider;
//
////@Configuration
////@EnableWebSecurity
//public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
//	@Autowired
//	private AuthenticationServiceImpl userDetailsService;
//	
//	@Autowired
//	JwtTokenProvider jwtTokenProvider;
//	
//	private static final String[] AUTH_WHITELIST = {
//            // -- swagger ui
//			"/swagger-resources/**",
//			"/swagger-ui.html",
//			"/v2/api-docs",
//			"/webjars/**",
//			"/forgotpassword/**","/sms","/awssms","/emails/**","/create","/verify","/resend", "/resendOTP","/resendotpcustom","/verifyOTP", "/verifyotpcustom"
//					, "/updatePassword", "/login", "/getLogin", "/forgotpasswordcustom/**", "/forgotpasswordcustom",
//					"/updatebeneficiaryuser","/skprofile","/createProfileInMC","/migrateprofile", "/portallogin","/portalprofile/**","/portalforgotpasswordcustom","/publickey", "/portalresendotpcustom","/portalforgotpassword/**","/portalloginuser","/portalverifyotpcustom"
//            // other public endpoints of your API may be appended to this array
//    };
//
//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		 http.cors().and().csrf().disable().authorizeRequests()
//         .antMatchers(AUTH_WHITELIST).permitAll().and().authorizeRequests().antMatchers(HttpMethod.POST,"/profile").permitAll()
//         .anyRequest().authenticated()
//         .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//    .apply(new JwtConfigurer(jwtTokenProvider));
//				
//	}
//	
//	@Override
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//}
