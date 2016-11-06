/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.IOException;
import java.math.BigInteger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpSession;


@WebServlet(name = "Login", urlPatterns = {"/login"})
public class Login extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rs, rst = null;
    String userid = null;
    String name = null;
    String utype = null;
    String otp = null;
    String result = "";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        userid = request.getParameter("userid");
        otp = request.getParameter("otp");
        
        /*Self generated algorithm */
        BigInteger ciphertxt = new BigInteger(userid);
        byte[] byteArray2 = ciphertxt.toByteArray();
        String s2 = new String(byteArray2);
        userid = s2.substring(3, s2.length());
        
        
        
        try {
            con = connection.dbConnection.makeConnection();
            String query = "SELECT name,utype FROM users WHERE userid = '" + userid + "' AND u_status = '1'";
            pst = con.prepareStatement(query);
            rst = pst.executeQuery();
            if (rst.next()) {
                name = rst.getString(1);
                utype = rst.getString(2);

                //check otp is exits or not
                try {

                    Date dNow = new Date();
                    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
                    String curDate = ft.format(dNow);

                    String mysql_query = "SELECT * FROM user_login WHERE userid = '" + userid + "' AND otp = '" + otp + "' AND created = '" + curDate + "'";                    
                    pst = con.prepareStatement(mysql_query);
                    rs = pst.executeQuery();
                    if (rs.next()) {
                        session.setAttribute("ID", userid);
                        session.setAttribute("NAME", name);
                        session.setAttribute("UTYPE", utype);
                        response.sendRedirect("myaccount.jsp");
                    } else {
                        session.setAttribute("MSG", "OTP is wrong. Please try again.");
                        response.sendRedirect("login.jsp");
                    }
                } catch (Exception e) {
                }

            } else {
                session.setAttribute("MSG", "Userid does not exits.");
                response.sendRedirect("login.jsp");
            }
        } catch (Exception e) {
            session.setAttribute("MSG", "Userid does not exits.");
            response.sendRedirect("login.jsp");
        }
    }
}
