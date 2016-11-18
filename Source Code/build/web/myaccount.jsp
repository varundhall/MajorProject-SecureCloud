<%-- 
    Document   : myaccount    
    Author     : Varun Dhall
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.ResultSet"%>
<!DOCTYPE html>
<%
    Connection conn = null;
    Statement st = null;
    ResultSet result = null;
    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
    response.setHeader("Pragma", "no-cache"); //HTTP 1.0
    response.setDateHeader("Expires", 0); //prevents caching at the proxy server
    response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
    String id = null;
    id = (String) session.getAttribute("ID");
    if (id != null) {
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>My Account -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>   
        <script type="text/javascript" src="js/scw.js"></script>
        <script type="text/javascript">
            function validation() {
                var name = document.getElementById('name');
                if (name.value.trim() == "") {
                    alert('Please enter your name');
                    name.focus();
                    return false;
                }

                var alphaExp = /^[a-z A-Z]+$/;
                if (!name.value.match(alphaExp)) {
                    alert("Name shoud be alphabatic.");
                    return false;
                }

                var email = document.getElementById('email');
                if (email.value.trim() == "") {
                    alert('Please enter your email');
                    email.focus();
                    return false;
                }

                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (reg.test(email.value) == false) {
                    alert('Please enter valid email');
                    email.focus();
                    return false;
                }

                var mobile = document.getElementById('mobile');
                if (mobile.value.trim() == "") {
                    alert('Please enter your mobile no.');
                    mobile.focus();
                    return false;
                }
                if (mobile.value.toString().length < 10) {
                    alert("Mobile no should be ten character long");
                    mobile.focus();
                    return false;
                }
            }
        </script>
    </head>
    <body>
        <table  cellspacing="0" cellpadding="0" align="center" border="0" class="body_content">           
            <tr>
                <td colspan="2"  class="header">
                    <%@include file="header.jsp" %>
                </td>
            </tr>
            <tr>
                <td class="content">  
                    <div class="form_content">
                        <form method="post" action="myAccount">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>My Account</span>
                                        </div>
                                    </td>
                                </tr>  
                                <%
                                    String msg = null;
                                    msg = (String) session.getAttribute("MSG");
                                    if (msg != null) {
                                %>
                                <tr>
                                    <td class="error"><%=msg%></td>
                                </tr>                                    
                                <%
                                        session.removeAttribute("MSG");
                                    } else {
                                        session.setAttribute("MSG", "");

                                    }
                                %>
                                <%
                                    try {
                                        conn = connection.dbConnection.makeConnection();
                                        String query = "SELECT name,email,mobile,gender,dob FROM users WHERE userid='" + id + "'";
                                        st = conn.prepareStatement(query);
                                        result = st.executeQuery(query);
                                        if (result.next()) {

                                            String name = result.getString(1);
                                            String email = result.getString(2);
                                            String mobile = result.getString(3);
                                            String gender = result.getString(4);
                                            String dob = result.getString(5);

                                %>
                                <tr>                                            
                                    <td><input type="text" name="userid" id="userid" placeholder="Userid" class="input" value="<%=id%>"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="name" id="name" placeholder="Name" class="input" value="<%=name%>"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="email" id="email" placeholder="Email" class="input" value="<%=email%>"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="mobile" id="mobile" placeholder="Mobile No." class="input" value="<%=mobile%>"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="dob" id="dob" placeholder="Date of Birth" class="input" onclick="scwShow(this, event)" readonly="" value="<%=dob%>" /></td>
                                </tr>
                                <tr>                                            
                                    <td>
                                        <select name="gender" id="gender" class="input">                                            
                                            <%
                                                if (gender.equals("Male")) {
                                            %>
                                            <option value="na"> - - - - Select - - - -</option>
                                            <option value="Male" selected="">Male</option>
                                            <option value="Female">Female</option>
                                            <%
                                            } else if (gender.equals("Female")) {
                                            %>
                                            <option value="na"> - - - - Select - - - -</option>
                                            <option value="Male">Male</option>
                                            <option value="Female"  selected="">Female</option>
                                            <%
                                            } else {
                                            %>
                                            <option value="na" selected=""> - - - - Select - - - -</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <%
                                                }
                                            %>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type="submit" name="btnsubmit" id="btnsubmit" value="Submit" onclick="return validation()">
                                    </td>
                                </tr>   
                                <%    }

                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }

                                %>
                            </table>
                        </form>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <%@include file="footer.jsp" %>
                </td>
            </tr>
        </table>
    </body>
</html>
<%    } else {
        session.setAttribute("MSG", "You must be login.");
        response.sendRedirect("login.jsp");
    }
%>