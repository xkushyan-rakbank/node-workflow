package ae.rakbank.apisecurity.base.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.security.GeneralSecurityException;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.cert.Certificate;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author Shailesh, Wipro Ltd
 *
 */

@Component
@ConditionalOnExpression("${apisecurity.data.encryption.enabled:true}")
@ConfigurationProperties
public class SecurityUtil {

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(SecurityUtil.class);

	private PrivateKey privateKey;

	private PublicKey key;

	private KeyStore ks;

//	@Value("${apisecurity.data.encryption.keystore.file:#{null}}")
	private String keystoreFile = "D:/Workspace/Project/CodeSetup/Security/Skiply_Projects/api-security-base/src/main/resources/skiply.p12";

//	@Value("${apisecurity.data.encryption.keystore.alias:#{null}}")
	private String alias= "skiply";

//	@Value("${apisecurity.data.encryption.keystore.password:#{null}}")
	private String password = "skiply@123!";

	private static final String UTF_8 = "UTF-8";

	@PostConstruct
	private void loadKeyStore() {

		LOG.debug("alias={}, password={}", alias, password);
		try {
			if (alias != null && password != null) {
				ks = KeyStore.getInstance("JKS");
				LOG.debug("keystoreFile=" + keystoreFile);
				ks.load(new FileInputStream(keystoreFile), password.toCharArray());
				LOG.debug("ks loaded in security util...");
				privateKey = (PrivateKey) ks.getKey(alias, password.toCharArray());
				// Get certificate of public key
				Certificate cert = ks.getCertificate(alias);
				key = cert.getPublicKey();
//				String keyStr = getPublicKey();
//				key = (PublicKey) keyStr.chars();
				LOG.debug("privateKey={}, key={}", privateKey.getFormat(), key.getFormat());
			}
		} catch (Exception e) {
			LOG.error("could not load response keystore due to {}", e.getMessage());
			e.printStackTrace();
		}
	}

	public String encryptAsymmetric(byte[] input) throws IOException, GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, privateKey);
		return Base64.encodeBase64String(cipher.doFinal(input));
	}

	public byte[] decryptAsymmetric(String input) throws IOException, GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, privateKey);
		return cipher.doFinal(Base64.decodeBase64(input));
	}

	public byte[] generateIV() {
		SecureRandom random = new SecureRandom();
		byte[] iv = new byte[16];
		random.nextBytes(iv);
		return iv;
	}

	public byte[] decryptSymmetric(String strToDecrypt, SecretKeySpec secretKey) {
		try {
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			return cipher.doFinal(Base64.decodeBase64(strToDecrypt));
		} catch (Exception e) {
			LOG.error("error while decrypting data {}", e.getMessage());
		}
		return null;
	}

	public String encryptSymmetric(String strToEncrypt, SecretKeySpec secretKey) {
		try {
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			return Base64.encodeBase64String(cipher.doFinal(strToEncrypt.getBytes(UTF_8)));
		} catch (Exception e) {
			LOG.error("error while encrypting data {}", e.getMessage());
		}
		return null;
	}

	public SecretKeySpec getSecretKeySpec(byte[] randomKey) {
		try {
			return new SecretKeySpec(randomKey, "AES");
		} catch (Exception e) {
			LOG.error("error while setting key for encryption {}", e.getMessage());
		}
		return null;
	}

	public String getPublicKey() throws IOException {
		PemObject pemObject = new PemObject("RSA PUBLIC KEY", key.getEncoded());
		StringWriter out = new StringWriter();
		PemWriter pemWriter = new PemWriter(out);
		try {
			pemWriter.writeObject(pemObject);
			pemWriter.flush();
			return out.toString();
		} finally {
			pemWriter.close();
		}
	}

}
