/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.*;
import connection.AES;

@WebServlet(name = "Description", urlPatterns = {"/description"})
public class Description extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rst = null;
    String filename = null;
    String file_name = null;
    String fullImagepath = null;
    String count = null;
    String upload_filepath = null;
    String uploadfile = null;

    String aeskey = null;
    

    boolean flag;
    int i = 0;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String id = request.getParameter("id");
        String file_path = request.getParameter("filepath");
        HttpSession session = request.getSession(true);
        ServletConfig config = getServletConfig();

        String context = config.getServletContext().getRealPath("/");
        String filePath = context + File.separator + file_path;

        try {
            con = connection.dbConnection.makeConnection();
            String query = "DELETE FROM files WHERE id= '" + id + "'";
            pst = con.prepareStatement(query);
            i = pst.executeUpdate();
            //delete files
            File file = new File(filePath);
            file.delete();

        } catch (Exception e) {
        }

        if (i > 0) {
            session.setAttribute("MSG", "File has been successfuly deleted !!");
            response.sendRedirect("filelist.jsp");
        } else {
            session.setAttribute("MSG", "File has not been deleted !!");
            response.sendRedirect("filelist.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        String uid = (String) session.getAttribute("ID");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        ServletConfig config = getServletConfig();
        String context = config.getServletContext().getRealPath("/");
        String filePath = context + File.separator + "uploads" + File.separator + "downloads" + File.separator;
        //connection from database
        try {
            con = connection.dbConnection.makeConnection();
        } catch (Exception e) {
        }

        boolean status = false;
        String enc_filpath = null;

        boolean isMultipart = ServletFileUpload.isMultipartContent(new ServletRequestContext(request));
        if (isMultipart) {
            FileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload upload = new ServletFileUpload(factory);
            try {
                List/*FileItem*/ items = upload.parseRequest(request);
                Iterator iter = items.iterator();
                while (iter.hasNext()) {
                    FileItem item = (FileItem) iter.next();
                    if (item.isFormField()) {

                        if (item.getFieldName().equalsIgnoreCase("publickey")) {
                            aeskey = item.getString();
                        }                       

                    } else {

                        if (item.getFieldName().equalsIgnoreCase("txtfile")) {

                            filename = item.getName();

                            if (!filename.equalsIgnoreCase("")) {
                                enc_filpath = filePath + filename;
                                try {
                                    File file = new File(enc_filpath);
                                    item.write(file);
                                    AES aes = new AES();
                                    String res = aes.Aesdecrypt(file, aeskey);
                                    if (res.equals("2")) {
                                        if (filename.endsWith(".aes")) {
                                            filename = filename.substring(
                                                    0, filename.length() - 4);
                                            file.delete();
                                            status = true;
                                        } else {
                                            status = false;
                                        }

                                    } else {
                                        status = false;
                                    }

                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }

                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                status = false;
            }
        }
        if (status) {
            response.sendRedirect("download.jsp?filename=" + filename);
        } else {
            session.setAttribute("MSG", "Please enter correct file.");
            response.sendRedirect("description.jsp");
        }

    }
}
