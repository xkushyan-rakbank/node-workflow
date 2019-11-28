/*
 * Copyright 2013-2018 Dell Inc. or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
package ae.rakbank.documentuploader.s3;

import java.net.URI;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.emc.object.s3.S3Client;
import com.emc.object.s3.S3Config;
import com.emc.object.s3.jersey.S3JerseyClient;
import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.documentuploader.commons.EnvUtil;
import ae.rakbank.documentuploader.helpers.FileHelper;

/**
 * Factory class to create the ECS S3 client. The client will be used in the
 * examples for the Java ECS S3 interface.
 */
@Component
public class ECSS3Factory {

	@Autowired
	FileHelper fileHelper;

	/* the S3 access key id - this is equivalent to the user */
	private String s3AccessKeyId = "";

	/* the S3 secret key associated with the S3_ACCESS_KEY_ID */
	private String s3SecretKey = "";

	/* the end point of the ECS S3 REST interface */
	private String s3Url = "";

	/* a unique bucket name to store objects */
	private String s3Bucket = "";

	/*
	 * the optional namespace within ECS - leave blank to use the default namespace
	 */
	public String seEcsNamespace = null; // use default namespace

	/* a unique object name to store */
	public static final String S3_OBJECT = "";

	@PostConstruct
	public void initAppState() {
		JsonNode docUploadConfig = fileHelper.getDocUploadConfigJson();
		JsonNode otherConfigs = docUploadConfig.get("OtherConfigs").get(EnvUtil.getEnv());
		s3AccessKeyId = otherConfigs.get("s3AccessKeyId").asText();
		s3SecretKey = otherConfigs.get("s3SecretKey").asText();
		s3Bucket = otherConfigs.get("s3Bucket").asText();
		s3Url = docUploadConfig.get("BaseURLs").get(EnvUtil.getEnv()).get("s3BaseUrl").asText()
				+ otherConfigs.get("s3Uri").asText();
	}

	public S3Client getS3Client() throws URISyntaxException {
		// for client-side load balancing
		// S3Config config = new S3Config(Protocol.HTTPS, S3_HOST1, S3_HOST2);
		// ditto with multiple VDCs
		// S3Config config = new S3Config(Protocol.HTTPS, new Vdc(S3_V1_HOST), new
		// Vdc(S3_V2_HOST));

		S3Config config = new S3Config(new URI(s3Url));

		config.withIdentity(s3AccessKeyId).withSecretKey(s3SecretKey);

		S3Client client = new S3JerseyClient(config);

		return client;
	}

	public String getS3Bucket() {
		return s3Bucket;
	}

}
