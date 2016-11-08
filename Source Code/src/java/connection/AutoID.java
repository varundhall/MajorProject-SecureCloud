/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;

public class AutoID {

    static Connection con = null;
    static ResultSet rs = null;
    static PreparedStatement ps = null;
    static String genID = "";
    static String generateid = "";

    public static String globalGenId(String form_name) {
        try {

            con = connection.dbConnection.makeConnection();
            //genID = pref;
            String temp = null;
            String num = null;
            int r = 1;

            String sql = "select prefix from auto_id where form_name='" + form_name + "'";
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            if (rs.next()) {
                temp = rs.getString(1).trim();
                //String auto_id[] = temp.split("-");
                //num = auto_id[1];
                r = Integer.parseInt(temp) + 1;

            }
            generateid = "";
            if (r < 10) {
                generateid = genID + "0000" + r;
            } else if (r < 100) {
                generateid = genID + "000" + r;
            } else if (r < 1000) {
                generateid = genID + "00" + r;
            } else if (r < 10000) {
                generateid = genID + "0" + r;
            } else {
                generateid = genID + r;
            }

        } catch (Exception e) {
        }
        return (generateid);
    }

    /********************** Method for update Auto generate id ***************************/

    
    public static void updateAutoID(String form_name, String id) {
        try {
            Connection con22 = connection.dbConnection.makeConnection();
            PreparedStatement pst22 = con22.prepareStatement("update auto_id set prefix='" + id + "' where form_name='" + form_name + "'");
            pst22.executeUpdate();
        } catch (Exception e) {
        }
    }
}
