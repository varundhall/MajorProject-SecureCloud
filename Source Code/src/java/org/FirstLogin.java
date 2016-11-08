/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.IOException;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet(name = "FirstLogin", urlPatterns = {"/firstLogin"})
public class FirstLogin extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rs, rst = null;
    String reg_id = null;
    String name = null;
    String utype = null;
    String otp = null;
    String result = "";
    String system_key = null;
    String user_id = null;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        reg_id = request.getParameter("userid");
        otp = request.getParameter("otp");
        system_key = request.getParameter("secretekey");

        try {
            con = connection.dbConnection.makeConnection();
            String query = "SELECT name,utype FROM users WHERE userid = '" + reg_id + "' AND user_otp = '" + otp + "' AND u_status = '1'";
            pst = con.prepareStatement(query);
            rst = pst.executeQuery();
            if (rst.next()) {
                name = rst.getString(1);
                utype = rst.getString(2);
                session.setAttribute("ID", reg_id);
                session.setAttribute("NAME", name);
                session.setAttribute("UTYPE", utype);

                /*Self generated algorithm */
                String key = system_key.substring(0, 3);
                String text = key + reg_id;
                byte[] fooBytes = text.getBytes();
                BigInteger ciper = new BigInteger(fooBytes);

                //update table
                String query_update = "UPDATE users SET gen_user_id = '" + ciper + "' WHERE userid = '" + reg_id + "'";
                pst = con.prepareStatement(query_update);
                pst.executeUpdate();
                response.sendRedirect("sucess_registration.jsp?userid=" + ciper);

            } else {
                session.setAttribute("MSG", "Userid and otp are wrong.");
                response.sendRedirect("secretkey.jsp?userid=" + reg_id + "&secretkey=" + system_key);
            }
        } catch (Exception e) {
            session.setAttribute("MSG", "Userid does not exits.");
            response.sendRedirect("secretkey.jsp?userid=" + reg_id + "&secretkey=" + system_key);
        }
    }
}
