<%-- 
    Document   : register    
    Author     : Varun Dhall
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Register -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
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
                        <form method="post" action="register">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>Register</span>
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
                                <tr>                                            
                                    <td><input type="text" name="name" id="name" placeholder="Name" class="input"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="email" id="email" placeholder="Email" class="input"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="mobile" id="mobile" placeholder="Mobile No." class="input"/></td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="dob" id="dob" placeholder="Date of Birth" class="input" onclick="scwShow(this, event)" readonly="" /></td>
                                </tr>
                                <tr>                                            
                                    <td>
                                        <select name="gender" id="gender" class="input">
                                            <option value="na" selected=""> - - - - Select - - - -</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <input type="submit" name="btnsubmit" id="btnsubmit" value="Submit" onclick="return validation()">
                                    </td>
                                </tr>                        
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
