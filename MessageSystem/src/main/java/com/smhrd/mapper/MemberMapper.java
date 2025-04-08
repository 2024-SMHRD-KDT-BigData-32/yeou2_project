package com.smhrd.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.smhrd.entity.Member;
import com.smhrd.entity.MyUser;
import com.smhrd.entity.UserJoin;

// 조건 2가지
// 1. mapper 파일임을 알려줘야함 -> @Mapper
// 2. DB와 관련된 root-context.xml 파일에서 어떤 패키지에서 mapper 파일을 scan할건지 명시
@Mapper
public interface MemberMapper {
	// 순서 : 컨트롤러 -> 인터페이스 -> 매퍼.xml
	
	// 인터페이스가 DAO 역할 할건데, DAO는 커넥션 관리까지 했다면 MemberMapper 인터페이스는 myBatis한테 "이 SQL 쿼리 실행해줘" 라고 요청만 하는 기능
	// 인터페이스는 객체생성 불가능
	
	// 추상메소드 
	public int Join(UserJoin userjoin);  // 인터페이스 이기에 바디 부분 없음

	public Member login(MyUser user);  // 리턴 타입 있음

	public void update(Member member);

	public List<Member> showMember();

	public void deleteMember(String email);

	public Member emailCheck(String inputE);
	
	@Select("SELECT id, pw, role FROM tb_member WHERE id = #{id} AND pw = #{pw}")
    Member login1(MyUser user);  // 로그인 처리 메서드


}



				
	
	
	
	
	
	
	
	

