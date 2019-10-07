Eclipse Project Setup

1. Install Open JDK 1.8 (Refer https://installvirtual.com/install-openjdk-8-on-mac-using-brew-adoptopenjdk/)
2. Download Eclipse IDE for Enterprise Java Developers from https://www.eclipse.org/downloads/packages/
3. Create a folder /workspace
4. Open Eclipse and browser for /workspace
5. Import projects.. -> maven -> Existing maven projects -> Browse for /Onboarding/webapplyserver --> Click Finish
6. Right click on Application.java and Run As -> Java Application

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
