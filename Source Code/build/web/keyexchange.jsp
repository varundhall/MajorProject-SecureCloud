<%-- 
    Document   : keyexchange   
    Author     : Varun Dhall
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<%
    String userid = request.getParameter("userid");
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
        <title>Key Exchange -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css">     
        <script type="text/javascript">
            function validation() {                
                var secretkey = document.getElementById('secretkey');
                if (secretkey.value.trim() == "") {
                    alert('Please enter your secret key');
                    secretkey.focus();
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
                        <form method="post" action="keyGeneration">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>Key Exchange</span>
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
                                        <span onclick="" class="span"><strong>Your Registration id is</strong></span>
                                    </td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="userid" id="userid" placeholder="User ID" class="input" readonly="" value="<%=userid%>"/></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span onclick="" class="span"><strong>Enter your secret private key for ECDH key exchange</strong></span>
                                    </td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="secretkey" id="secretkey" placeholder="Secret Key" class="input"/></td>
                                </tr>                            
                                <tr>
                                    <td align="right">
                                        <input type="submit" name="btnsubmit" id="btnsubmit" value="Submit" onclick="return validation();">
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
