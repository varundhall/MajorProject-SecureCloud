<%-- 
    Document   : secretkey    
    Author     : Varun Dhall
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid = request.getParameter("userid");
    String secretkey = request.getParameter("secretkey");
%>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
        <title>Secrete Key -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css">  
        <script type="text/javascript">
            function validation() {
                
                var otp = document.getElementById('otp');
                if (otp.value.trim() == "") {
                    alert('Please enter your otp');
                    otp.focus();
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
                        <form method="post" action="firstLogin">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>Generate User ID</span>
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
                                    <td>
                                        <span onclick="" class="span"><strong>Your ECDH key is</strong></span>
                                    </td>
                                </tr>
                                <tr>                                            
                                    <td>
                                        <input type="hidden" name="userid" id="userid" value="<%=userid%>"/>
                                        <input type="text" name="secretekey" id="secretekey" placeholder="Secrete key" class="input" readonly="" value="<%=secretkey%>"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span onclick="" class="span">OTP has send to your email id</span>
                                    </td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="otp" id="otp" placeholder="OTP" class="input"/></td>
                                </tr>                            
                                <tr>
                                    <td align="right">
                                        <input type="submit" name="btnsubmit" id="btnsubmit" value="Generate User ID" onclick="return validation();"><br/>                                        
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
