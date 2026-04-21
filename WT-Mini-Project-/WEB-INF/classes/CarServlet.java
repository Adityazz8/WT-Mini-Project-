import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.sql.*;

public class CarServlet extends HttpServlet {

public void doPost(
HttpServletRequest request,
HttpServletResponse response)

throws ServletException, IOException {

response.setContentType("text/html");

PrintWriter out =
response.getWriter();

String carName =
request.getParameter("car_name");

String brand =
request.getParameter("brand");

String price =
request.getParameter("price");

try {

Class.forName(
"com.mysql.cj.jdbc.Driver");

Connection con =
DriverManager.getConnection(

"jdbc:mysql://localhost:3306/cardb",
"root",
"root"

);

PreparedStatement ps =
con.prepareStatement(

"insert into cars(car_name,brand,price) values(?,?,?)"

);

ps.setString(1, carName);
ps.setString(2, brand);
ps.setString(3, price);

ps.executeUpdate();

out.println("<h2>Car Added Successfully</h2>");

con.close();

}

catch(Exception e){

out.println(e);

}

}

}
