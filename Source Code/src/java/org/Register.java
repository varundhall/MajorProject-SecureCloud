/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "Register", urlPatterns = {"/register"})
public class Register extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rst = null;
    String name = null;
    String email = null;
    String mobile = null;
    String dob = null;
    String gender = null;
    String userid = null;
    int i = 0;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        userid = request.getParameter("reg_id");
        HttpSession session = request.getSession(true);

        try {
            con = connection.dbConnection.makeConnection();
            String query = "delete from users WHERE userid= '" + userid + "' ";
            pst = con.prepareStatement(query);
            i = pst.executeUpdate();

        } catch (Exception e) {
        }

        if (i > 0) {
            session.setAttribute("MSG", "User has been successfuly deleted !!");
            response.sendRedirect("usrelist.jsp");
        } else {
            session.setAttribute("MSG", "User has not been deleted !!");
            response.sendRedirect("usrelist.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        ServletConfig config = getServletConfig();
        String context = config.getServletContext().getRealPath("/");

        //connection from database
        try {
            con = connection.dbConnection.makeConnection();
        } catch (Exception e) {
        }

        userid = connection.AutoID.globalGenId("registration");
        name = request.getParameter("name");
        email = request.getParameter("email");
        mobile = request.getParameter("mobile");
        dob = request.getParameter("dob");
        gender = request.getParameter("gender");

        try {
            String sqlquery = "INSERT INTO users(userid,name,email,mobile,dob,gender,created) VALUES(?,?,?,?,?,?, NOW())";
            pst = con.prepareStatement(sqlquery);
            pst.setString(1, userid);
            pst.setString(2, name);
            pst.setString(3, email);
            pst.setString(4, mobile);
            pst.setString(5, dob);
            pst.setString(6, gender);
            i = pst.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();;
        }

        if (i > 0) {
            connection.AutoID.updateAutoID("registration", userid);
            response.sendRedirect("keyexchange.jsp?userid=" + userid);
        } else {
            session.setAttribute("MSG", "Your data has not been registered.");
            response.sendRedirect("register.jsp");
        }
    }
}
