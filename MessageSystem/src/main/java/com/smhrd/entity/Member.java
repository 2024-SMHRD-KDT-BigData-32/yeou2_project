package com.smhrd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.sql.Timestamp;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data  // toString, Getter, Setter 등등 다양한 기능이 들어있는 만능
public class Member {

	// 필드 생성
	private String mb_id; 
    private String mb_pw;
    private String mb_name;
    private String mb_nick;
    private String mb_email;
    private String mb_gender;
    private Date mb_birthdate;
    private String mb_role;
    private Timestamp joined_at;
	// 롬복 파일 설치하기 -> 경로 확인 필요 -> bin -> eclipse -> eclipse 실행파일 클릭 -> 확인 -> 인스톨/업데이터 -> 파일 들어가서 롬복 파일 있는지 확인 -> pom.xml 파일에 dependency 추가 -> 사용가능

	
	// 메소드 생성
    public enum Gender{
		MALE, FEMALE
	}
    
    // 회원가입 부분
    // Getter, Setter 추가
    
 // 📌 Setter 메서드 추가
    public void setId(String id) {
        this.mb_id = id;
    }

    public void setPw(String pw) {
        this.mb_pw = pw;
    }

    public void setName(String name) {
        this.mb_name = name;
    }

    public void setNick(String nick) {
        this.mb_nick = nick;
    }

    public void setEmail(String email) {
        this.mb_email = email;
    }

    public void setGender(String gender) {
        this.mb_gender = gender;
    }

    public void setBirthdate(Date birthdate) {
        this.mb_birthdate = birthdate;
    }
    
    public String getRole() {
        return getRole();
    }

    public void setRole(String role) {
        this.mb_role = role;
    }

    public void setJoinedAt(Timestamp joinedAt) {
        this.joined_at = joinedAt;
    }
    
    
    // 로그인 부분
   
    

}
