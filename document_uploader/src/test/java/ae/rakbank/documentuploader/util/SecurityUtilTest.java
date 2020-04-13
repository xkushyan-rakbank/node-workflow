package ae.rakbank.documentuploader.util;

import ae.rakbank.documentuploader.stub.ConfigFactory;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;


@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes={SecurityUtil.class, FileUtil.class})
public class SecurityUtilTest {

    private static final String STRING_TO_ENCRYPT = "string to encrypt";
    private static final String ENCRYPTED_STRING = "KlYIAsq1Cb7qMn99XWqlcmakf8ajl3gECaUtMaGfKqE=";
    private static final String DECRYPTED_BASE64_KEY = "g1BjbGEn5Be7UyWIoh6bnA==";
    private static final String ENCRYPTED_BASE64_KEY = "I4lIWDqrJ9fZ/ZvvkUUORpki+cNYJRmgqChYPlm28OgRMqlKgDWqjPJarrhQ6Xk" +
            "8F7UH7pMjwz1k+g8upBXNvdc08K22s5Dp1xnwUVY8nAJMsXAwc420CmkTgc5lJ3713Z+lIQzzVOd37K+pc2UDo/boKNA9qywgZOeSzYkfr" +
            "xT8jd8v8tofPYiFoTIvgB3D9Y0EEpfDhnTTnfFxCDrfm4XNvvyBiC9eaHtRz1eD4aSMPYwddkjLhsubTGf1XAKZea/vIn3ZC1VXkVH4Amt" +
            "fUr0F6FNVLNDEaBa7XU9UFtaaJsqG6VQdKNNfBxmv5hRqPIuvWwLbGI3+S5AHogrhSP3f1Yek5m87Y9Njcqe+b2ZVVjqhPNRRAaxqEJoKG" +
            "C/hPdTYf8Skl3u3gZEHRcurJgcxWov6bG5285vEBjycco8BSt0NaBFeH0PMJrQcQ4PKayUrlHKyj84WIhy6Gp/OW6OEj7FhqiFdHn7f5IW" +
            "Wi5FV7ZuFfKFwL0X2zgdKypOsk26wSGBVi9tVRyQzdMyVicfrZgWBIHgA8uv2edJGAJ+O8cAYc3nwTg7B4sDWdc0pr+kWfS8MRsy6PhMzr" +
            "Zwo7mk1E7G29YB4WizppxTaCAyM8FKwyW0NHarpLi1XK04bTysq1MWO3Z3/V46OjzCfZpfIxYN+KvW9fbSDdCdsemE=";

    private final SecretKeySpec validKey =
            new SecretKeySpec("7D012D758C113ED22C8808F0C1236A04".getBytes(StandardCharsets.UTF_8), "AES");

    private final SecretKeySpec invalidKey =
            new SecretKeySpec("7D012D758C113E".getBytes(StandardCharsets.UTF_8), "AES");

    @Mock
    private FileUtil fileUtil;

    @Autowired
    private SecurityUtil securityUtil;

    @Test
    public void decryptAsymmetric() {
        Mockito.when(fileUtil.getRSAPrivateKey()).thenReturn(ConfigFactory.rsaPublicKey());
        byte[] bytes = securityUtil.decryptAsymmetric(ENCRYPTED_BASE64_KEY);
        Assert.assertNotNull(bytes);
        Assert.assertEquals(DECRYPTED_BASE64_KEY, new String(bytes));
    }

    @Test
    public void decryptAsymmetricWithEmptyInput() {
        Mockito.when(fileUtil.getRSAPrivateKey()).thenReturn(ConfigFactory.rsaPublicKey());
        byte[] bytes = securityUtil.decryptAsymmetric("");
        Assert.assertNull(bytes);
    }

    @Test
    public void encryptSymmetric() {
        String result = securityUtil.encryptSymmetric(STRING_TO_ENCRYPT, validKey);
        Assert.assertNotNull(result);
        Assert.assertEquals(ENCRYPTED_STRING, result);
    }

    @Test
    public void encryptSymmetricWithInvalidKey() {
        String result = securityUtil.encryptSymmetric(STRING_TO_ENCRYPT, invalidKey);
        Assert.assertNull(result);
    }

    @Test
    public void getSecretKeySpec() {
        SecretKeySpec secretKeySpec =
                securityUtil.getSecretKeySpec("7D012D758C113ED22C8808F0C1236A04".getBytes(StandardCharsets.UTF_8));
        Assert.assertNotNull(secretKeySpec);
        Assert.assertEquals(validKey, secretKeySpec);
    }

    @Test
    public void getSecretKeySpecWithNullKey() {
        SecretKeySpec secretKeySpec = securityUtil.getSecretKeySpec(null);
        Assert.assertNull(secretKeySpec);
    }
}
