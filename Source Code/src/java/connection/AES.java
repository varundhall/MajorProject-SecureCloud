/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package connection;

import java.io.*;
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.*;

/* Aes file encryption */
public class AES {

    private static final long serialVersionUID = 1L;
    private long read = 0;

    //decryption method
    public String Aesdecrypt(File f, String pwd) {
        String res = null;
        try {
            String kind = "AES";
            Cipher c = Cipher.getInstance(kind);
            Key k = new SecretKeySpec(pwd.getBytes(), kind);
            c.init(Cipher.DECRYPT_MODE, k);
            String filename = f.getCanonicalPath();

            if (filename.endsWith(".aes")) {
                filename = filename.substring(
                        0, filename.length()
                        - kind.length());    // -suffix
            } else {
                res = "1";
            }

            FileInputStream fis
                    = new FileInputStream(f.getCanonicalPath());

            FileOutputStream fos = new FileOutputStream(filename);
            CipherInputStream cis = new CipherInputStream(fis, c);
            byte[] buffer = new byte[0xFFFF];
            final long size = f.length();

            for (int len; (len = cis.read(buffer)) != -1;) {
                fos.write(buffer, 0, len);
                read += len;
            }
            cis.close();
            fos.flush();
            fos.close();
            fis.close();
            read = 0;
            res = "2";
        } catch (Exception x) {
            res = "3";
            x.printStackTrace();
        }
        return res;
    }

    //encrypt method
    public String Aesencrypt(File f, String pwd, String uploadfilepath) {
        String res = null;

        try {
            String kind = "AES";
            Cipher c = Cipher.getInstance(kind);
            Key k = new SecretKeySpec(pwd.getBytes(), kind);
            c.init(Cipher.ENCRYPT_MODE, k);

            FileInputStream fis
                    = new FileInputStream(f);
            FileOutputStream fos
                    = new FileOutputStream(uploadfilepath + ".aes");
            CipherOutputStream cos = new CipherOutputStream(fos, c);
            final int size = (int) f.length();
            byte[] buffer = new byte[0xFFFF];

            for (int len; (len = fis.read(buffer)) != -1;) {
                cos.write(buffer, 0, len);
                read += len;
            }
            cos.flush();
            cos.close();
            fos.flush();
            fos.close();
            fis.close();
            read = 0;
            res = "2";
        } catch (Exception x) {
            res = "1";
            x.printStackTrace();
        }
        return res;
    }
}