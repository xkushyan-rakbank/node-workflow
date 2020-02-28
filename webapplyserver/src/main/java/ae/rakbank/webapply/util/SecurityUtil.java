package ae.rakbank.webapply.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;

import org.apache.commons.codec.binary.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private static final String AES_ECB_PKCS5_PADDING = "AES/ECB/PKCS5Padding";
    private final FileUtil fileUtil;

    private static final String UTF_8 = "UTF-8";

    public byte[] decryptAsymmetric(String input) {
        String privateKeyContent = fileUtil.getRSAPrivateKey();
        privateKeyContent = privateKeyContent
                .replaceAll("\\n", "")
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "");

        byte[] result = null;
        try {
            KeyFactory kf = KeyFactory.getInstance("RSA");
            PKCS8EncodedKeySpec keySpecPKCS8 = new PKCS8EncodedKeySpec(Base64.decodeBase64(privateKeyContent));
            PrivateKey privKey = kf.generatePrivate(keySpecPKCS8);

            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, privKey);
            result = cipher.doFinal((Base64.decodeBase64(input)));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return result;
    }

    public byte[] decryptSymmetric(String strToDecrypt, SecretKeySpec secretKey) {
        try {
            Cipher cipher = Cipher.getInstance(AES_ECB_PKCS5_PADDING);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return cipher.doFinal(Base64.decodeBase64(strToDecrypt));
        } catch (Exception e) {
            log.error("error while decrypting data {}", e.getMessage());
        }
        return new byte[0];
    }

    public String encryptSymmetric(String strToEncrypt, SecretKeySpec secretKey) {
        try {
            Cipher cipher = Cipher.getInstance(AES_ECB_PKCS5_PADDING);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            return Base64.encodeBase64String(cipher.doFinal(strToEncrypt.getBytes(UTF_8))).replaceAll("(?:\\r\\n|\\n\\r|\\n|\\r)", "");
        } catch (Exception e) {
            log.error("error while encrypting data {}", e.getMessage());
        }
        return null;
    }

    public SecretKeySpec getSecretKeySpec(byte[] randomKey) {
        try {
            return new SecretKeySpec(randomKey, "AES");
        } catch (Exception e) {
            log.error("error while setting key for encryption {}", e.getMessage());
        }
        return null;
    }
}
