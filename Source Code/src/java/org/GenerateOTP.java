/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(name = "GenerateOTP", urlPatterns = {"/generateOTP"})
public class GenerateOTP extends HttpServlet {

    Connection con = null;
    PreparedStatement pst = null;
    ResultSet rs, rst = null;
    String userid = null;
    String email = null;
    String result = "";
    int otp = 0;
    int i = 0;
    String host = "smtp.gmail.com";
    String port = "587";
    String userName = "emailID";
    String password = "emailPass";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/xml");
        PrintWriter out = response.getWriter();
        //connection from database
        try {
            con = connection.dbConnection.makeConnection();
        } catch (Exception e) {
        }

        userid = request.getParameter("userid");

        //Generate  random no
        Random rand = new Random();
        otp = rand.nextInt((999999 - 100000) + 1) + 100000;

        /*Self generated algorithm */
        BigInteger ciphertxt = new BigInteger(userid);
        byte[] byteArray2 = ciphertxt.toByteArray();
        String s2 = new String(byteArray2);        
        userid = s2.substring(3, s2.length());

        //send email to user
        try {
            String query = "SELECT email FROM users WHERE userid = '" + userid + "' AND u_status = '1'";
            pst = con.prepareStatement(query);
            rst = pst.executeQuery();
            if (rst.next()) {
                email = rst.getString(1);
                System.out.println("email: " + email);
                String subject = "OTP from Secure Cloud using ECC";
                String message = "Your OTP is " + otp;
                //Send email                
                try {
                    EmailUtility.sendEmail(host, port, userName, password, email, subject,
                            message);
                    // resultMessage = "The e-mail was sent successfully";
                } catch (Exception ex) {
                    ex.printStackTrace();
                    //resultMessage = "There were an error: " + ex.getMessage();
                }

            } else {
                result = "Your user id does not exits.";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        //Check user is today generate otp or not
        //check otp is exits or not
        try {

            Date dNow = new Date();
            SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
            String curDate = ft.format(dNow);

            String mysql_query = "SELECT * FROM user_login WHERE userid = '" + userid + "' AND created = '" + curDate + "'";
            pst = con.prepareStatement(mysql_query);
            rs = pst.executeQuery();
            if (rs.next()) {
                String mysqlupdate = "UPDATE user_login set otp = '" + otp + "' WHERE userid = '" + userid + "'  AND created = '" + curDate + "'";
                pst = con.prepareStatement(mysqlupdate);
                i = pst.executeUpdate();
                if (i > 0) {
                    result = "OTP has been successfully send on your registered email id.";
                } else {
                    result = "OTP has not been generated, Please try again.";
                }
            } else {
                String sqlquery = "INSERT INTO user_login(userid,otp,created) VALUES(?,?,NOW())";
                pst = con.prepareStatement(sqlquery);
                pst.setString(1, userid);
                pst.setInt(2, otp);
                i = pst.executeUpdate();
                if (i > 0) {
                    result = "OTP has been successfully send on your registered email id.";
                } else {
                    result = "OTP has not been generated, Please try again.";
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        out.write("<status><sname>" + result + "</sname></status>");

    }

}
