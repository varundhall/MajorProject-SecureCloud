/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.http.HttpSession;


@WebServlet(name = "AdminLogin", urlPatterns = {"/adminLogin"})
public class AdminLogin extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rs, rst = null;
    String userid = null;
    String name = null;
    String utype = null;
    String password = null;
    String result = "";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        userid = request.getParameter("userid");
        password = request.getParameter("password");
        try {
            con = connection.dbConnection.makeConnection();
            String query = "SELECT name,utype FROM users WHERE userid = '" + userid + "' AND user_otp = '" + password + "' AND u_status = '1'";
            pst = con.prepareStatement(query);
            rst = pst.executeQuery();
            if (rst.next()) {
                name = rst.getString(1);
                utype = rst.getString(2);

                session.setAttribute("ID", userid);
                session.setAttribute("NAME", name);
                session.setAttribute("UTYPE", utype);
                response.sendRedirect("myaccount.jsp");

            } else {
                session.setAttribute("MSG", "Userid and password are wrong.");
                response.sendRedirect("adminlogin.jsp");
            }
        } catch (Exception e) {
            e.printStackTrace();
            session.setAttribute("MSG", "Userid and password are wrong.");
            response.sendRedirect("adminlogin.jsp");
        }
    }
}
