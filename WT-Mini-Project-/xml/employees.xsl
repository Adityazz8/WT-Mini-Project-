<?xml version="1.0"?>

<xsl:stylesheet
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
version="1.0">

<xsl:template match="/">

<html>

<head>

<style>

body {

font-family: Poppins;

background: linear-gradient(
135deg,
#f1f4f9,
#e6ecf5
);

}

table {

border-collapse: collapse;

width: 90%;

margin: auto;

background: white;

box-shadow: 0 6px 15px rgba(0,0,0,0.1);

}

th {

background: #d4af37;

color: white;

padding: 12px;

}

td {

padding: 10px;

text-align: center;

}

h2 {

text-align: center;

color: #333;

}

</style>

</head>

<body>

<h2>EliteDrive Employee Details</h2>

<table border="1">

<tr>

<th>ID</th>
<th>Name</th>
<th>Role</th>
<th>Department</th>
<th>Salary</th>
<th>Experience</th>

</tr>

<xsl:for-each select="employees/employee">

<tr>

<td>
<xsl:value-of select="emp_id"/>
</td>

<td>
<xsl:value-of select="name"/>
</td>

<td>
<xsl:value-of select="role"/>
</td>

<td>
<xsl:value-of select="department"/>
</td>

<td>
<xsl:value-of select="salary"/>
</td>

<td>
<xsl:value-of select="experience"/>
</td>

</tr>

</xsl:for-each>

</table>

</body>

</html>

</xsl:template>

</xsl:stylesheet>