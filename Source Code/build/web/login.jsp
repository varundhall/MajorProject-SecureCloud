<%-- 
    Document   : login    
    Author     : Varun Dhall
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
        <title>Login -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css">        
        <script type="text/javascript">
            function validation() {
                var userid = document.getElementById('userid');
                if (userid.value.trim() == "") {
                    alert('Please enter your userid');
                    userid.focus();
                    return false;
                }
                var opt = document.getElementById('opt');
                if (opt.value.trim() == "") {
                    alert('Please enter your opt');
                    opt.focus();
                    return false;
                }
            }

            function otpgeneration() {
                
                var userid = document.getElementById('userid');
                if (userid.value.trim() == "") {
                    alert('Please enter your userid');
                    userid.focus();
                    return false;
                } else {
                    var xmlHttpRequest = init();
                    function init() {
                        if (window.XMLHttpRequest) {
                            return new XMLHttpRequest();
                        } else if (window.ActiveXObject) {
                            return new ActiveXObject("Microsoft.XMLHTTP");
                        }
                    }                    
                    xmlHttpRequest.open("POST", "generateOTP?userid=" + escape(userid.value), true);
                    xmlHttpRequest.onreadystatechange = processRequest;
                    xmlHttpRequest.send(null);

                    function processRequest() {
                        if (xmlHttpRequest.readyState == 4) {
                            if (xmlHttpRequest.status == 200) {
                                processResponse();
                            }
                        }
                    }

                    function processResponse() {
                        var xmlMessage = xmlHttpRequest.responseXML;
                        var result = xmlMessage.getElementsByTagName("sname")[0].firstChild.nodeValue;
                        alert(result);
                    }
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
                        <form method="post" action="login">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>Login</span>
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
                                    <td><input type="text" name="userid" id="userid" placeholder="User ID" class="input"/></td>
                                </tr>
                                <tr>
                                    <td align="right">
                                        <span onclick="return otpgeneration()" class="span_button">Request for OTP</span>
                                    </td>
                                </tr>
                                <tr>                                            
                                    <td><input type="text" name="otp" id="opt" placeholder="OTP" class="input"/></td>
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
