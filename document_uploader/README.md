Eclipse Project Setup
1. Install Open JDK 1.8 (Refer https://installvirtual.com/install-openjdk-8-on-mac-using-brew-adoptopenjdk/ )
2. Download Eclipse IDE for Enterprise Java Developers from https://www.eclipse.org/downloads/packages/ 
3. Create a folder /workspace
4. Open Eclipse and browser for /workspace
5. Import projects.. -> maven -> Existing maven projects -> Browse for /Onboarding/webapplyserver --> Click Finish
6. Right click on project and maven -> update project
7. Create WAR file, Right click on pom.xml -> Run As - > Maven Clean and then Maven Install
8. docUploader.war file created under /target folder


War Artifact:
1. Go to webapplyserver project folder (cmd or terminal)
2. Run "mvn clean install" to create war file under <PROJECT_DIR>/target folder

JBoss EAP Deployment:
1. Download JBoss EAP 7.2.0 (zip file) from https://developers.redhat.com/products/eap/download 
2. Unzip the jboss-eap-7.2.0.zip
3. Copy docUploader.war to /jboss-eap-7.2.0/standalone/deployments/
4. Start the server from /jboss-eap-7.2/bin/
5. Use ./standalone.sh on Mac and ./standalone.bat on Windows to start the server and deploy the war

Important Class Files:
1. DocumentUploadController: provides an API to store the uploaded file at <WEB_APPLY_DIR>/uploads
2. S3FileUploader : a task class which runs every 5 minutes to upload files from <WEB_APPLY_DIR>/scanned_docs to S3 bucket and then moves the file(s) to <WEB_APPLY_DIR>/s3_objects for archive/purge.
3. ECSS3Factory: prepares S3Config object with configuration values from DocUploadConfig.json and then creates a S3Client
4. FileHelper: This class loads file(s) from classpath or pre-defined directory.
5. ApiError : a helper class to convert exception and/or error response to JSON.
6. EnvUtil : reads the value of environment variables like WEB_APPLY_ENV (local, dev, uat, test or prod) and WEB_APPLY_DIR (a directory path for config files)

Config Files:
1. DocUploadConfig.json : contains S3 bucket details
2. application.properties: contains config for file size limit

Open Issues / Refactor:
1. JUnit tests are pending as mentioned in DEV tasks.
2. PUT method has issue in binding the RequestParam (fileInfo), use POST method until this issue is fixed.
3. Remove @CrossOrigin from Controller class once the development is done.
4. logback-spring.xml: a logger configuration file, currently logs written to server.log instead of application log file. This works fine when the application is run as standalone or with embedded servlet container.

Environment variables:

1. WEB_APPLY_DIR - path to web apply directory
2. WEB_APPLY_ENV - name of profile, list of all profiles you can see into DocUploadConfig.json file.
3. WEBAPPLY_LOGGING_LEVEL - logging level