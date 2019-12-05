package ae.rakbank.webapply.util;

import ae.rakbank.webapply.commons.EnvUtil;
import com.fasterxml.jackson.databind.ser.Serializers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import org.apache.commons.codec.binary.Base64;
import sun.misc.BASE64Decoder;
import sun.rmi.runtime.Log;

import static ae.rakbank.webapply.security.ReadWriteKey.PRIVATE_KEY_FILE;
import static ae.rakbank.webapply.security.ReadWriteKey.decrypt;

@Component
//@ConditionalOnExpression("${skiply.data.encryption.enabled:false}")
public class SecurityUtil {

    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(SecurityUtil.class);

    private PrivateKey privateKey;

    private static final String UTF_8 = "UTF-8";

    @PostConstruct
    private void loadKeyStore() {
        try {
            ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(PRIVATE_KEY_FILE));
            privateKey = (PrivateKey) inputStream.readObject();
        } catch (Exception e) {
            LOG.error("Error reading private key", e.getMessage());
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
            byte[] finalString = cipher.doFinal((Base64.decodeBase64(input)));
            LOG.info("Decrypted key =" + finalString);
            return finalString;
    }

    public byte[] generateIV() {
        SecureRandom random = new SecureRandom();
        byte[] iv = new byte[16];
        random.nextBytes(iv);
        return iv;
    }

    public byte[] decryptSymmetric(String strToDecrypt, SecretKeySpec secretKey) {
        try {
            LOG.info("String data to decrypt=" + strToDecrypt);
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
}
