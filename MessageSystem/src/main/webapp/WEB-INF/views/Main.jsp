<%@page import="com.smhrd.entity.Member"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	<body>
	<% Member loginMember = (Member) session.getAttribute("loginMember"); %>
		<!-- Wrapper -->
			<div id="wrapper">
			
				<!-- Header -->
					<header id="header" class="alt">
						<a href="index.html" class="logo"><strong>Forty</strong> <span>by HTML5 UP</span></a>
						<nav>
							<!-- Q6. 로그인을 한 상태에서는 로그인탭 대신 로그아웃탭과 개인정보수정탭을 출력 - JSTL - EL 코드 방식으로 작성 
								header 안에서는 <c 자동입력이 안먹힘 -> 헤더 밖에서 적고 복붙하면 편함 -->
								<!-- empty == null , !empty(=not empty) == not null , eq == equals-->
							<c:if test="${empty loginMember }">
								<a href="#menu">로그인</a> <!-- #menu 그대로 -->
							</c:if>
							<c:if test="${not empty loginMember }">
								<c:if test="${loginMember.email eq 'admin@smhrd.kr' }">
								<a href="showMember">회원전체조회</a>
								</c:if>
								<a href="goUpdateMember">회원정보수정</a>
								<a href="logoutMember">로그아웃</a>
							</c:if>
							
							<!-- JSTL 다중if문 사용 방법
								<c:choose>
								<c:when test=""> </c:when>
								<c:when test=""> </c:when>
								<c:when test=""> </c:when>
								<c:otherwise> </c:otherwise>
								</c:choose>
							 -->
								
								
							<!-- Q6. 로그인을 한 상태에서는 로그인탭 대신 로그아웃탭과 개인정보수정탭을 출력 - java 코드 방식으로 작성
							<%if (loginMember == null) { %>
								<a href="#menu">로그인</a>
							<% } else {%>
								<%if (loginMember.getEmail().equals("admin@smhrd.kr")) { %>
									<a href="#menu">회원전체조회</a>
								<%} %>
								
								<a href="goUpdateMember">회원정보수정</a>
								<a href="logoutMember">로그아웃</a>
							<%} %>
							-->
							
							
							<!-- Q7. 개인정보수정 기능 만들기 -->
							<!-- Q8. 로그아웃 기능 만들기 -->
							
							<!-- Q9. 관리자 계정(admin)일 때는 회원정보관리 탭 만들기 -->
						</nav>
					</header>
					
					
					
				<!-- Menu -->
					<nav id="menu">	
						<ul class="links">
						<!-- Q3. 로그인 기능 만들기 -->
							<li><h5>로그인</h5></li>
								<form action="loginMember" method="post">
									<li><input type="text" name="email" placeholder="Email을 입력하세요"></li>
									<li><input type="password" name="pw"  placeholder="PW를 입력하세요"></li>
									<li><input type="submit" value="LogIn" class="button fit"></li>
								</form>
						</ul>
						<ul class="actions vertical">
						<!-- Q1. 회원가입 기능 만들기 -->
							<li><h5>회원가입</h5></li>
								<form action="joinMember" method="post">
									<li><input type="text" id="inputE" name="id"  placeholder="id을 입력하세요"></li>

									<li><input type="button" value="id 중복체크" onclick="checkE()"></li>
									<li><span id="possibleid"></span></li>
									
									<li><input type="password" name="pw" placeholder="PW를 입력하세요"></li>
									<li><input type="password" name="pw" placeholder="입력한 PW를입력하세요."></li>
									<li><input type="text" name="tel" placeholder="이름을 입력하세요"></li>
									<li><input type="text" name="address" placeholder="닉네임을 입력하세요"></li>
									<li><input type="text" name="address" placeholder="생년월일을 선택하세요."></li>
									<li><input type="text" name="address" placeholder="이메일을 입력하세요."></li>
									<li><input type="submit" value="JoinUs" class="button fit"></li>
								</form>
						</ul>
					</nav>			
				<!-- Banner -->
					<section id="banner" class="major">
						<div class="inner">
							<header class="major">
							<!-- Q4. 로그인 후 로그인한 사용자의 아이디로 바꾸기 -->
							<!-- ex) smhrd님 환영합니다.  -->
							
							
								<%if (loginMember == null) {%>
									<h1>로그인 한 세션아이디를 출력해주세요</h1>
									<%} else {%>
										<h1><%=loginMember.getEmail() %>님 환영합니다.</h1>
									<% }%>
								
							</header>
							<div class="content">
								<p>게시판을 이용해보세요 ^^<br></p>
								<ul class="actions">
									<li><a href="boardMain" class="button next scrolly">게시판 바로가기</a></li>
								</ul>
							</div>
						</div>
					</section>

				<!-- Main -->
					<div id="main">

						<!-- One -->
							<section id="one" class="tiles">
								<article>
									<span class="image">
										<img src="resources/images/pic01.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">HTML</a></h3>
										<p>홈페이지를 만드는 기초 언어</p>
									</header>
								</article>
								<article>
									<span class="image">
										<img src="resources/images/pic02.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">CSS</a></h3>
										<p>HTML을 디자인해주는 언어</p>
									</header>
								</article>
								<article>
									<span class="image">
										<img src="resources/images/pic03.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">Servlet/JSP</a></h3>
										<p>Java를 기본으로 한 웹 프로그래밍 언어/스크립트 언어</p>
									</header>
								</article>
								<article>
									<span class="image">
										<img src="resources/images/pic04.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">JavaScript</a></h3>
										<p>HTML에 기본적인 로직을 정의할 수 있는 언어</p>
									</header>
								</article>
								<article>
									<span class="image">
										<img src="resources/images/pic05.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">MVC</a></h3>
										<p>웹 프로젝트 중 가장 많이 사용하는 디자인패턴</p>
									</header>
								</article>
								<article>
									<span class="image">
										<img src="resources/images/pic06.jpg" alt="" />
									</span>
									<header class="major">
										<h3><a href="#" class="link">Web Project</a></h3>
										<p>여러분의 최종프로젝트에 웹 기술을 활용하세요!</p>
									</header>
								</article>
							</section>
					<!-- Two -->
							<section id="two">
								<div class="inner">
									<header class="major">
										<h2>나에게 온 메세지 확인하기</h2>
									</header>
									<p></p>
									<ul class="actions">
										<!-- Q12. 로그인 이메일 출력! -->
										<!-- ex) smhrd님에게 온 메시지  -->
										<li>로그인을 하세요.</li>
										<!-- Q14. 메시지 전체 삭제 기능 -->								
										<li><a href="#" class="button next scrolly">전체삭제하기</a></li>
									</ul>
									<!-- Q13. table형태로 나한테 온 메시지만 가져와서 보여주기
											 번호, 보낸사람, 내용, 시간 -->
									<!-- Q15. 메시지 개별 삭제 기능 -->								
								</div>
							</section>

					</div>

				<!-- Contact -->
					<section id="contact">
						<div class="inner">
							<section>
							<!-- Q11. 메시지 보내기 기능(메시지는 계속 확인하기 위해서 DB에 저장!) -->
							<!-- 다른 사람의 DB에 메시지 저장해보기! -->
								<form>
								<div class="field half first">
										<label for="name">Name</label>
										<input type="text"  id="name" placeholder="보내는 사람 이름" />
									</div>
									<div class="field half">
										<label for="email">Email</label>
										<input type="text"  id="email" placeholder="받는 사람 이메일"/>
									</div>

									<div class="field">
										<label for="message">Message</label>
										<textarea  id="message" rows="6"></textarea>
									</div>
									<ul class="actions">
										<li><input type="submit" value="Send Message" class="special" /></li>
										<li><input type="reset" value="Clear" /></li>
									</ul>
								</form>
							</section>
							
							<section class="split">
								<section>
									<div class="contact-method">
										<span class="icon alt fa-envelope"></span>
										<h3>Email</h3>
										<!-- Q5. 로그인 한 사용자의 이메일을 출력 -->
										<a href="#">로그인 한 사람의 이메일을 출력</a>
									</div>
								</section>
								<section>
									<div class="contact-method">
										<span class="icon alt fa-phone"></span>
										<h3>Phone</h3>
										<!-- Q5. 로그인 한 사용자의 전화번호를 출력 -->
										<span>로그인 한 사람의 전화번호를 출력</span>
									</div>
								</section>
								<section>
									<div class="contact-method">
										<span class="icon alt fa-home"></span>
										<h3>Address</h3>
										<!-- Q5. 로그인 한 사용자의 집주소를 출력 -->
										<span>로그인 한 사람의 집주소를 출력</span>
									</div>
								</section>
							</section>					
						</div>
					</section>

				<!-- Footer -->
					<footer id="footer">
						<div class="inner">
							<ul class="icons">
								<li><a href="#" class="icon alt fa-twitter"><span class="label">Twitter</span></a></li>
								<li><a href="#" class="icon alt fa-facebook"><span class="label">Facebook</span></a></li>
								<li><a href="#" class="icon alt fa-instagram"><span class="label">Instagram</span></a></li>
								<li><a href="#" class="icon alt fa-github"><span class="label">GitHub</span></a></li>
								<li><a href="#" class="icon alt fa-linkedin"><span class="label">LinkedIn</span></a></li>
							</ul>
							<ul class="copyright">
								<li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
							</ul>
						</div>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="resources/assets/js/jquery.min.js"></script>
			<script src="resources/assets/js/jquery.scrolly.min.js"></script>
			<script src="resources/assets/js/jquery.scrollex.min.js"></script>
			<script src="resources/assets/js/skel.min.js"></script>
			<script src="resources/assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
			<script src="resources/assets/js/main.js"></script>
			
			<script type="text/javascript">
				function checkE() {/* jQuery : $ */
					var inputE = $('#inputE').val();
					console.log(inputE);
					
					$.ajax({  // 데이터를 JSON 타입으로 묶어주는 dependency 적용시켜야함
						// 어디로 요청할 것인지
						url : "emailCheck", 
						// 요청 데이터가 있다면 어떤 타입으로 보낼건지
						data : {'inputE' : inputE},
						type : 'get',  // 생략 가능 -> 기본값이 'get'
						// 응답에 성공했다면 어떤 함수를 실행할건지
						success : function(data) {
							console.log(data);
							if (data == 0) {
								$('#possibleEmail').text("사용 불가능한 Email");
							} else {
								$('#possibleEmail').text("사용 가능한 Email");	
							}
						},
						// 응답에 실패했다면 어떤 함수를 실행할건지
						error : function() {
							alert("통신실패!")
						}

					})
					
				}
			</script>
	</body>
</html>

