/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet(name = "MyAccount", urlPatterns = {"/myAccount"})
public class MyAccount extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rst = null;
    String name = null;
    String email = null;
    String mobile = null;
    String dob = null;
    String gender = null;
    String id = null;
    int i = 0;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);        
       

        //connection from database
        try {
            con = connection.dbConnection.makeConnection();
        } catch (Exception e) {
        }

        name = request.getParameter("name");
        email = request.getParameter("email");
        gender = request.getParameter("gender");
        dob = request.getParameter("dob");
        mobile = request.getParameter("mobile");
        id = (String) session.getAttribute("ID");

        try {
            String sqlquery = "update users set name=?,email=?,gender=?,dob=?,mobile=? where userid = '" + id + "'";
            pst = con.prepareStatement(sqlquery);
            pst.setString(1, name);
            pst.setString(2, email);
            pst.setString(3, gender);
            pst.setString(4, dob);
            pst.setString(5, mobile);
            i = pst.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //success or failure message
        if (i > 0) {

            session.setAttribute("MSG", "Your profile has been successfully update.");
            response.sendRedirect("myaccount.jsp");
        } else {
            session.setAttribute("MSG", "Your profile has not been update.");
            response.sendRedirect("myaccount.jsp");
        }

    }
}
