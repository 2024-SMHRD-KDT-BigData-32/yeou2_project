<%@page import="com.smhrd.entity.Member"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 1.request영역에 저장된 정보를 가져오시오. -->

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Forty by HTML5 UP</title>
		<meta charset="UTF-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
		<link rel="stylesheet" href="resources/assets/css/main.css" />
		<!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
		<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
		
	</head>
	<style>
	
	</style>
	<body style="text-align: center;">
		<!-- Wrapper -->
			<div id="wrapper">
				<!-- Menu -->
					<nav id="Update">	
						<table>
							<caption><h2>회원관리페이지</h2></caption>
							<tr>	
								<td>Num</td>
								<td>Email</td>
								<td>Tel</td>
								<td>Address</td>							
							</tr>
							<!-- Q10. 테이블에 저장된 모든 회원의 이메일(email),전화번호(tel),주소(address)를 출력하시오. -->
							
							<!-- JSTL 사용 -->
							<c:forEach items="${list }" var="i" varStatus="s">
								<tr>
									<td>${s.count }</td>
									<td>${i.email }</td>
									<td>${i.tel }</td>
									<td>${i.address }</td>
									<td><a href="deleteMember/${i.email}">삭제</a></td>  <!-- 값을 한개만 보낼때 사용하는 패스베리어블 방식 => 컨트롤러 작성도 다름 -->
									<!-- 값을 여러개 보낼때 사용하는 쿼리스트링 방식 <td><a href="deleteMember?email=${i.email}">삭제</a></td> -->
								</tr>
							</c:forEach>
							
							
							
							<!-- for문 사용
							<% List<Member> list = (List<Member>)request.getAttribute("list"); %>
							
							<% for (int i = 0; i < list.size(); i++) { %>
								<tr>
									<td><%= list.get(i).getEmail() %></td>
									<td><%= list.get(i).getTel() %></td>
									<td><%= list.get(i).getAddress() %></td>
								</tr>
							<% }%>
							
							 for each문 사용 
							<%for (Member i : list) { %> 
								<tr>
									<td><%= i.getEmail() %></td>
									<td><%= i.getTel() %></td>
									<td><%= i.getAddress() %></td>
								</tr>
							<%} %>
							-->
						</table>
					</nav>		
					<a href="/controller/" class="button next scrolly">되돌아가기</a>	
			</div>
		<!-- Scripts -->
			<script src="resources/assets/js/jquery.min.js"></script>
			<script src="resources/assets/js/jquery.scrolly.min.js"></script>
			<script src="resources/assets/js/jquery.scrollex.min.js"></script>
			<script src="resources/assets/js/skel.min.js"></script>
			<script src="resources/assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
			<script src="resources/assets/js/main.js"></script>
	</body>
</html>

