/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package connection;

public class GenerateRandomString {

    private static final String ALPHA_NUM
            = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public String getAlphaNumeric(int len) {
        StringBuffer sb = new StringBuffer(len);
        for (int i = 0; i < len; i++) {
            int ndx = (int) (Math.random() * ALPHA_NUM.length());
            sb.append(ALPHA_NUM.charAt(ndx));
        }
        return sb.toString();
    }
}
