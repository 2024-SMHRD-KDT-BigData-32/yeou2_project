<%@page import="com.smhrd.entity.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Forty by HTML5 UP</title>
		<meta charset="utf-8" />
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
						<ul class="actions vertical">
							<li><h5>회원정보수정</h5></li>
							<% Member loginMember = (Member)session.getAttribute("loginMember"); %>
								<form action="updateMember" method="post">
									<input type="hidden" name="email" value="${loginMember.email }">  <!-- 방법1. email이 PK 값이기 때문에 누구의 데이터인지 알려면 email값 필요함 -> 화면엔 안보이게 값 넘길 수 있게 작업 -->
									<li>접속한 Email : <%=loginMember.getEmail() %></li>
									<li>접속한 Email : ${loginMember.email }</li>
									<li><input type="password" name="pw" placeholder="PW를 입력하세요" style="width: 500px; margin: 0 auto;"></li>
									<li><input type="text" name="tel" value="${loginMember.tel }" readonly="readonly" placeholder="전화번호를 입력하세요" style="width: 500px; margin: 0 auto;"></li>
									<li><input type="text" name="address" value="${loginMember.address }"  placeholder="집주소를 입력하세요" style="width: 500px; margin: 0 auto;"></li>
									<li><input type="submit" value="UPDATE" class="button fit" style="width: 500px; margin: 0 auto;"></li>
								</form>
						</ul>
					</nav>			
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

