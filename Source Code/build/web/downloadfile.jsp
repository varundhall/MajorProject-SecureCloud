<%-- 
    Document   : downloadfile    
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
        <title>Download File -  Efficient & Secure Data Storage & Access Scheme in Cloud Computing using AES</title>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>   
    </head>
    <body>
        <table class="body_content" cellspacing="0" cellpadding="0">           
            <tr>
                <td colspan="2"  class="header">
                    <%@include file="header.jsp" %>
                </td>
            </tr>
            <tr>
                <td class="content">                    
                    <table cellpadding="2" cellspacing="2" width="100%">
                        <tr>
                            <td colspan="5">
                                <div class="expand">
                                    <span>Download File</span>
                                </div> 
                            </td>
                        </tr>    
                        <%
                            String msg = null;
                            msg = (String) session.getAttribute("MSG");
                            if (msg != null) {
                        %>
                        <tr>
                            <td colspan="5" align="center">
                                <div style="width:100%;color: #3278A3; font-size: 12px;font-weight: bold;" align="center"><%=msg%></div>
                             </td>
                        </tr>
                        <%
                                session.removeAttribute("MSG");
                            } else {
                                session.setAttribute("MSG", "");

                            }
                        %>
                        <tr class="heading_lable">
                            <td align="center">S.No</td>                                            
                            <td align="center">File Name</td>
                            <td align="center">Adding Date</td>
                            <td align="center">Download</td>                                            
                            <td align="center">Delete</td>                                            
                        </tr>
                        <%
                            int i = 0;
                            try {
                                conn = connection.dbConnection.makeConnection();
                                String query = "SELECT id,file_name,file_path,created FROM files WHERE userid='" + id + "' ORDER BY id DESC";
                                st = conn.prepareStatement(query);
                                result = st.executeQuery(query);
                                while (result.next()) {
                                    String fileid = result.getString(1);
                                    String fname = result.getString(2);
                                    String filepath = result.getString(3);
                                    String adding_date = result.getString(4);
                                    i++;
                        %>
                        <tr bgcolor="#f9f9f9">
                            <td align="center"><%=i%>.</td>
                            <td><%=fname%></td> 
                            <td align="center"><%=adding_date%>.</td>
                            <td align="center">
                                <a href="keydescription.jsp?fileid=<%=fileid%>">Download</a>                                
                            </td>
                            <td align="center">
                                <a href="encryption?id=<%=fileid%>&filepath=<%=filepath%>" class="cursor">Delete</a>
                            </td>
                        </tr>
                        <%    }

                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        %>
                    </table>
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