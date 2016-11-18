<%-- 
    Document   : download    
    Author     : Varun Dhall
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%    response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
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
        <title>Download -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>           
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
                        <form method="post" action="description" enctype="multipart/form-data">
                            <table cellpadding="3" cellspacing="3" width="100%">
                                <tr>
                                    <td>
                                        <div class="expand">
                                            <span>Download</span>
                                        </div>
                                    </td>
                                </tr>  
                                <tr>
                                    <td style="font-size: 16px;text-align: center; ">
                                        <%
                                            String filename = request.getParameter("filename");
                                        %>
                                        Your file has been successfully decrypted.<br/><br/>
                                        <a href="uploads/downloads/<%=filename%>" class="span">Click here to download decrypted file</a><br/><br/>
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
<%    } else {
        session.setAttribute("MSG", "You must be login.");
        response.sendRedirect("login.jsp");
    }
%>