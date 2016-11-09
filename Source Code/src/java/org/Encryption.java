/**
 * @author Varun Dhall
 * All Rights Reserved.
 */
package org;

import connection.AES;
import static connection.ECC.bytesToHex;
import static connection.ECC.encryptString;
import static connection.ECC.generateSharedSecret;
import connection.GenerateRandomString;
import java.io.*;
import java.math.BigInteger;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.ECGenParameterSpec;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import javax.crypto.KeyAgreement;
import javax.crypto.SecretKey;
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

@WebServlet(name = "Encryption", urlPatterns = {"/encryption"})
public class Encryption extends HttpServlet {

    static Connection con = null;
    PreparedStatement pst = null;
    ResultSet rst = null;
    String filename = null;
    String file_name = null;
    String fullImagepath = null;
    String count = null;
    String upload_filepath = null;
    String uploadfile = null;
    String algo = null;
    String aeskey = null;
    String xkey = null;    
    boolean flag;
    String encryptedkey = null;
    String cipherText = null;
    PrivateKey privKeyU = null;
    PublicKey pubKeyU = null;
    String secretU = null;
    String secretV = null;
    String instance = "ECDH";

    int i = 0;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String id = request.getParameter("id");
        String file_path = request.getParameter("filepath");
        HttpSession session = request.getSession(true);
        String uid = (String) session.getAttribute("ID");
        ServletConfig config = getServletConfig();

        String context = config.getServletContext().getRealPath("/");
        String filePath = context + File.separator + file_path;

        try {
            con = connection.dbConnection.makeConnection();
            String query = "DELETE FROM files WHERE id= '" + id + "' and userid='" + uid + "' ";
            pst = con.prepareStatement(query);
            i = pst.executeUpdate();

            //delete files
            File file = new File(filePath);
            file.delete();

        } catch (Exception e) {
        }

        if (i > 0) {
            session.setAttribute("MSG", "File has been successfuly deleted !!");
            response.sendRedirect("downloadfile.jsp");
        } else {
            session.setAttribute("MSG", "File has not been deleted !!");
            response.sendRedirect("downloadfile.jsp");
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

        //connection from database
        try {
            con = connection.dbConnection.makeConnection();
        } catch (Exception e) {
        }

        String filePath = context + File.separator + "uploads" + File.separator;

        boolean status = false;
        String enc_filpath = null;

        java.util.Date d = new java.util.Date();
        long timestamp = d.getTime();

        try {
            File projectDir = new File(filePath);
            if (!projectDir.exists()) {
                projectDir.mkdirs();

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

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

                        if (item.getFieldName().equalsIgnoreCase("xkey")) {
                            xkey = item.getString();
                        }

                    } else {
                        // upload first image
                        if (item.getFieldName().equalsIgnoreCase("txtfile")) {
                            filename = item.getName();

                            if (!filename.equalsIgnoreCase("")) {

                                String extension = filename.substring(filename.lastIndexOf("."), filename.length());
                                file_name = "encrypted" + extension;//full image path
                                enc_filpath = filePath + File.separator + file_name;
                                File file3 = new File(enc_filpath);
                                uploadfile = "f" + timestamp + extension;
                                upload_filepath = "uploads/" + uploadfile;
                                enc_filpath = filePath + uploadfile;

                                GenerateRandomString grs = new GenerateRandomString();
                                aeskey = grs.getAlphaNumeric(16);
                                try {

                                    item.write(file3);
                                    AES aes = new AES();
                                    String res = aes.Aesencrypt(file3, aeskey, enc_filpath);
                                    if (res.equals("2")) {

                                        upload_filepath = upload_filepath + ".aes";
                                        status = true;
                                        KeyPairGenerator kpg;
                                        kpg = KeyPairGenerator.getInstance("EC", "SunEC");
                                        ECGenParameterSpec ecsp;                                        
                                        ecsp = new ECGenParameterSpec(xkey);
                                        kpg.initialize(ecsp);
                                        KeyPair kpU = kpg.genKeyPair();
                                        privKeyU = kpU.getPrivate();
                                        pubKeyU = kpU.getPublic();
                                        KeyPair kpV = kpg.genKeyPair();
                                        PrivateKey privKeyV = kpV.getPrivate();
                                        PublicKey pubKeyV = kpV.getPublic();
                                        KeyAgreement ecdhU = KeyAgreement.getInstance("ECDH");
                                        ecdhU.init(privKeyU);
                                        ecdhU.doPhase(pubKeyV, true);
                                        KeyAgreement ecdhV = KeyAgreement.getInstance("ECDH");
                                        ecdhV.init(privKeyV);
                                        ecdhV.doPhase(pubKeyU, true);
                                        secretU = new BigInteger(1, ecdhU.generateSecret()).toString(16).toUpperCase();
                                        secretV = new BigInteger(1, ecdhV.generateSecret()).toString(16).toUpperCase();

                                       SecretKey secretKeyA = generateSharedSecret(kpV.getPrivate(),
                                                kpV.getPublic());                                                                              
                                        cipherText = encryptString(secretKeyA, aeskey);
                                        byte[] plainTextBytes = aeskey.getBytes("UTF-8");
                                        cipherText = bytesToHex(plainTextBytes);
                                        
                                    } else {
                                        status = false;
                                    }
                                } catch (Exception e1) {
                                    e1.printStackTrace();
                                    status = false;
                                }
                                file3.delete();
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

            try {
                String sqlquery = "INSERT INTO files(file_name,file_path,userid,created,encrypted_aes_key,privatekey) VALUES(?,?,?,NOW(),?,?)";
                pst = con.prepareStatement(sqlquery);
                pst.setString(1, filename);
                pst.setString(2, upload_filepath);
                pst.setString(3, uid);
                pst.setString(4, cipherText);
                pst.setString(5, secretV);
                i = pst.executeUpdate();

            } catch (Exception e) {
                e.printStackTrace();;
            }

            if (i > 0) {

                String messge = "<span style='darkgreen'>Your file has been successfully encrypted.<br/> Your key is <strong>" + secretU + ".</strong> <br/>Please enter your key at a time of downloading files.</span>";
                session.setAttribute("MSG", messge);
                response.sendRedirect("encryption.jsp");
            } else {
                session.setAttribute("MSG", "File has not been uploaded.");
                response.sendRedirect("encryption.jsp");
            }
        } else {
            session.setAttribute("MSG", "File has not been uploaded.");
            response.sendRedirect("encryption.jsp");
        }
    }
}
