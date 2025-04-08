package com.smhrd.controller;

import java.awt.PageAttributes.MediaType;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.reflection.SystemMetaObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.SpelMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.entity.Member;
import com.smhrd.entity.MyUser;
import com.smhrd.entity.UserJoin;
import com.smhrd.mapper.MemberMapper;

// Controller(POJO)를 찾기위해서는
// 1. servlet-context.xml 파일에서 어떤 패키지에서 찾을건지 명시하기
// 2. @Controller 달아주기
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping
@Controller
public class MemberController {
   
   private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
   
   @Autowired
   private MemberMapper mapper;
   //React Spring 연결 mapping-----------------------------------------------
   
//   @GetMapping("/login")
//   public int login(@RequestParam("id") String id, @RequestParam("pw") String pw) {
//      System.out.println(id);
//      return 0;
//   }
  
   @PostMapping(value = "/login", produces = "text/plain; charset=UTF-8")
   @ResponseBody
   public String login(@RequestBody MyUser user) {
	   System.out.println("✅ user 객체: " + user);
	    System.out.println("✅ getId: " + user.getId());
	    System.out.println("✅ getPw: " + user.getPw());

	    // DB에서 사용자 정보 및 역할 확인
	    Member result = mapper.login(user); // DB 조회
	    System.out.println("입력값: " + user.getId() + ", " + user.getPw());
	    System.out.println("🔸 [DB 결과] 조회된 데이터: " + result);

	    if (result != null) {
	        // DB에서 역할 정보 확인 (여기서 역할을 'USER' 또는 'ADMIN'으로 판단)
	        String role = result.getMb_role();  // Member 객체에 role 정보가 있다고 가정

	        // 로그인 성공 후 역할에 따른 처리
	        if (role != null) {
	            if (role.equals("ADMIN")) {
	                return "관리자 로그인 성공";
	            } else if (role.equals("USER")) {
	                return "사용자 로그인 성공";
	            }
	        }
	        
	        return "로그인성공"; // 기본 로그인 성공
	    } else {
	        return "아이디 또는 비밀번호가 틀렸습니다";
	    }
	}

   @PostMapping("/joinMember")
   public ResponseEntity<?> joinMember(@RequestBody UserJoin userjoin) {
       int result = mapper.Join(userjoin);
       System.out.println("🟦 [DB 결과] 조회된 데이터: " + result);
       return ResponseEntity.ok("회원가입 완료!");
   }


//   @PostMapping("/admin/login")
//   @ResponseBody
//   public String Admin(@RequestBody Admin admin, HttpSession session) {
//	      String id = admin.getId();
//	      String pw = admin.getPw();
//	      
//	      if (!"admin".equals(id)) {
//	          return "NOT_ADMIN";  // ❌ 관리자 아님
//	      }
//
//	      // 예시: 하드코딩 비밀번호 확인 (보안 상 DB 연동 권장)
//	      if ("admin".equals(id) && "98765".equals(pw)) {
//	          getSession().setAttribute("admin", id);
//	          return "ADMIN_OK";
//	      } else {
//	          return "FAIL"; // 비밀번호 틀림
//	      }
//	      
//	   }
   
   //React Spring 연결 mapping-----------------------------------------------
   
   private ServletRequest getSession() {
	// TODO Auto-generated method stub
	return null;
   }

   @GetMapping("/emailCheck")
   public @ResponseBody int emailCheck(@RequestParam("inputE") String inputE) {
      
      Member mem = mapper.emailCheck(inputE);
      
      if(mem == null) {
         // 사용가능한 이메일
         return 1;
      }else {
         // 사용불가능한 이메일
         return 0;
      }
      
   }
   
   
   @GetMapping("/deleteMember/{email}")
   public String deleteMember(@PathVariable("email") String email) {
      
      // MemberMapper 인터페이스에 deleteMember(email) 메소드 만들기
      mapper.deleteMember(email);
      // MemberMapper.xml 파일에서 email에 해당하는 회원 삭제하기
      
      return "redirect:/showMember";
   }
   
   /*
    * @GetMapping("/deleteMember") // deleteMember?email=??&pw=?? public String
    * deleteMember(@RequestParam("email") String email) {
    * 
    * return "redirect:/showMember"; }
    */
   
   // 페이지 이동 + 테이블에서 전체 회원 조회
   @GetMapping("/showMember")
   public String showMember(Model model) {
      List<Member> list = mapper.showMember();
      model.addAttribute("list", list);
      return "ShowMember";
   }
   
   @PostMapping("/updateMember")
   public String updateMember(Member member, HttpSession session) { // email, pw, tel, address
      System.out.println(member.toString());
      mapper.update(member);
      session.setAttribute("loginMember", member);
      return "Main";
   }
   
   @GetMapping("/goUpdateMember")
   public String goUpdateMember() {
      return "UpdateMember";
   }
   
   @GetMapping("/memberLogout")
   public String memberLogout(HttpSession session) {
//      session.removeAttribute("loginMember");
      session.invalidate();
      return "Main";
   }
   
   
 
   
   
   @GetMapping("/")  // Get방식으로 "/"라고 요청이 들어오면 아래에 있는 메소드를 실행시키겠다!!!
   public String main() {
      return "Main"; // /WEB-INF/views/Main.jsp
   }
   
   
   
}
