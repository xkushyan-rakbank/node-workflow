Eclipse Project Setup

1. Install Open JDK 1.8 (Refer https://installvirtual.com/install-openjdk-8-on-mac-using-brew-adoptopenjdk/)
2. Download Eclipse IDE for Enterprise Java Developers from https://www.eclipse.org/downloads/packages/
3. Create a folder /workspace
4. Open Eclipse and browser for /workspace
5. Import projects.. -> maven -> Existing maven projects -> Browse for /Onboarding/webapplyserver --> Click Finish
6. Right click on project and maven -> update project
7. Create WAR file, Right click on pom.xml -> Run As - > Maven Clean and then Maven Install
8. webapply.war file created under /target folder

API Invocation:

(From Browser) http://localhost:9090/webapply/api/v1/config?role=customer&product=checking&segment=sme

(From Postman) POST http://localhost:9090/webapply/api/v1/config/reload

War Artifact:
1. Go to webapplyserver project folder (cmd or terminal)
2. Run "mvn clean install" to create war file under <PROJECT_DIR>/target folder

JBoss EAP Deployment:
1. Download JBoss EAP 7.2.0 (zip file) from https://developers.redhat.com/products/eap/download
2. Unzip the jboss-eap-7.2.0.zip
3. Copy webapply.war to /jboss-eap-7.2.0/standalone/deployments/
4. Start the server from /jboss-eap-7.2/bin/ 
5. Use ./standalone.sh on Mac and ./standalone.bat on Windows to start the server and deploy the war

Important Class Files:
1. WebApplyController : This class provides an API to load/reload configuration for WebApply (FrontEnd). 
On startup, configuration is loaded based on criteria like role, segment, product and device and final configuration is stored in 
ServletContext in JSON format. DEH API GET Datalist is invoked and LOVs are updated in configuration based on datalistId value.

2. ApiRequestForwarder: A wrapper class for DEH APIs, WebApply (FrontEnd) invokes APIs provided by this class, 
requests are forwarded to DEH APIs and response sent back to WebApply(FrontEnd)

3. OAuthService: This class invokes OAuthService to get the access token and stores in ServletContext for reuse. 
It invokes the OAuthService again if the access token is expired.

4. FileHelper: This class loads file(s) from classpath or pre-defined directory.

5. EnvUtil : reads the value of environment variables like WEB_APPLY_ENV (local, dev, uat, test or prod) and WEB_APPLY_DIR (a directory path of config files)

Config Files:
1. uiConfig.json : cotains UI configuration for WebApply, loaded from classpath
2. appConfig.json : contains endpoints for APIs and key-value pairs for OAuth, reCAPTCHA. This file loaded from filepath <WEB_APPLY_DIR>/config/
3. smeProspect.json: contains SME project object with default values, loaded from classpath
4. datalist.json: A placeholder to store LOVs which are provided by DEH GET Datalist API,loaded from classpath
5. RSAPublicKey.json:  contains RSA public key for encryption/decryption. This file loaded from filepath <WEB_APPLY_DIR>/config/

Open Issues / Refactor:
1. Request/Response are logged with INFO level to help developers to troubleshoot issues with APIs. 
Change the log statements to logger.debug to avoid logging prospect information.

2. Refactor: RecaptchaController is obsolete now as the reCAPTCHA verification is done before invoked before createProspect, agent authentication and send OTP.  

3. CookieHelper, CSRFTokenHelper will become obsolete once the API security is integrated with WebApplyServer.

4. JUnit tests are pending as mentioned in DEV tasks.

5. logback-spring.xml: a logger configuration file, currently logs written to server.log instead of application log file. This works fine when the application is run as standalone or with embedded servlet container.
