package com.smhrd.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserJoin{
	
	// 필드 생성 
	@JsonProperty("mb_id")
	private String id;
	@JsonProperty("mb_pw")
	private String pw;
	@JsonProperty("mb_name")
	private String name;
	@JsonProperty("mb_nick")
	private String nick;
	@JsonProperty("mb_email")
	private String email;
	@JsonProperty("mb_gender")
	private String gender;
	@JsonProperty("mb_birthdate")
	private String birthdate;
	@JsonProperty("mb_role")
	private String role;
	@JsonProperty("joined_at")
	private String joined_at;
	
	
	
	public String getId() {
		return id;
	}
	
	// 메소드 
	@Override
	public String toString() {
		return "UserJoin [id=" + id + ", pw=" + pw + ", name=" + name + ", nick=" + nick + ", email=" + email
				+ ", gender=" + gender + ", birthdate=" + birthdate + ", role=" + role + ", joied_at + joined_at]";
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirthdate() {
		return birthdate;
	}
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getJoined_at() {
		return joined_at;
	}
	public void setJoined_at(String joined_at) {
		this.joined_at = joined_at;
	}
	
	
}