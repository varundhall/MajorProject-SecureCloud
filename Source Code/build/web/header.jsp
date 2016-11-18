<%-- 
    Document   : header   
    Author     : Varun Dhall
--%>
<table cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td  valign="middle" align="left">
            <h1>Secure Cloud Simulation</h1>           
        </td>  
        <td valign="bottom" align="right" style="padding-right: 10px;">            
        </td>
    </tr>
    <%
        if (null != session.getAttribute("UTYPE")) {
    %>
    <tr>
        <td  class="header_menu" colspan="2" align="left">
            <a href="myaccount.jsp" class="white_font_bold">&nbsp;My Account&nbsp;</a><span class="clear">|</span>
            <%
                String utype = (String) session.getAttribute("UTYPE");
                if (utype.equals("admin")) {
            %>
            <a href="usrelist.jsp" class="white_font_bold">User List</a><span class="clear">|</span>
            <a href="filelist.jsp" class="white_font_bold">File List</a><span class="clear">|</span>
            <a href="encryption.jsp" class="white_font_bold">Encryption</a><span class="clear">|</span>
            <a href="description.jsp" class="white_font_bold">Decryption</a><span class="clear">|</span>
            <a href="downloadfile.jsp" class="white_font_bold">Download&nbsp;File</a>
            <% } else {
            %>
            <a href="encryption.jsp" class="white_font_bold">Encryption</a><span class="clear">|</span>
            <a href="description.jsp" class="white_font_bold">Decryption</a><span class="clear">|</span>
            <a href="downloadfile.jsp" class="white_font_bold">Download&nbsp;File</a>
            <% }
            %> 
            <%
                if (null != session.getAttribute("ID")) {
            %>
            <span style="float: right;padding-right: 10px;">
                <span class="white_font">Welcome,</span> 
                <span class="white_font"><%=(String) session.getAttribute("NAME")%>&nbsp;</span>
                <a href="logout" class="white_font">(Logout)</a>
            </span>
            <% }%>
        </td>
    </tr>
    <% } else {%>
    <tr>
        <td class="header_menu" colspan="2">            
            <a href="index.jsp" class="white_font_bold">&nbsp;Home&nbsp;</a><span class="clear">|</span>                
            <a href="register.jsp" class="white_font_bold">&nbsp;Register&nbsp;</a><span class="clear">|</span>
            <a href="login.jsp" class="white_font_bold">&nbsp;Login&nbsp;</a>  
            <span class="white_font_bold">
                <marquee style="width: 640px;margin-left: 20px;">
                    Efficient & Secure Data Storage & Access Scheme in Cloud Computing using Elliptic Curve Cryptography and AES
                </marquee>
            </span>
        </td>        
    </tr>
    <% }%>
</table>