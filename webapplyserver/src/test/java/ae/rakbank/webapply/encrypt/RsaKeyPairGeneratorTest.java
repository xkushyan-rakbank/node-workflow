package ae.rakbank.webapply.encrypt;

import org.junit.Ignore;
import org.junit.Test;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.util.Base64;

public class RsaKeyPairGeneratorTest {

    @Ignore
    @Test
    public void printKeyToFileTempTest() throws Exception{
        KeyPair pair = RsaKeyPairGenerator.generateKeyPair();

        RsaKeyPairGenerator.writeToFile("C:/keys/0212/publickeyencoded", pair.getPrivate().getEncoded());
        RsaKeyPairGenerator.writeToFile("C:/keys/0212/privatekeyencoded", pair.getPrivate().getEncoded());
        RsaKeyPairGenerator.writeToFile("C:/keys/0212/publickey", Base64.getEncoder().encodeToString(pair.getPublic().getEncoded()).getBytes());
        RsaKeyPairGenerator.writeToFile("C:/keys/0212/privatekey", Base64.getEncoder().encodeToString(pair.getPrivate().getEncoded()).getBytes());
        System.out.println(Base64.getEncoder().encodeToString(pair.getPublic().getEncoded()));
        System.out.println(Base64.getEncoder().encodeToString(pair.getPrivate().getEncoded()));
        writePemFile(pair.getPrivate(), "RSA PRIVATE KEY", "pemprivate");
        writePemFile(pair.getPublic(), "RSA PUBLIC KEY", "pempublic");



    }

    private static void writePemFile(Key key, String description, String filename)
            throws FileNotFoundException, IOException {
        PemFile pemFile = new PemFile(key, description);
        pemFile.write(filename);

     //   LOGGER.info(String.format("%s successfully writen in file %s.", description, filename));
    }

}
