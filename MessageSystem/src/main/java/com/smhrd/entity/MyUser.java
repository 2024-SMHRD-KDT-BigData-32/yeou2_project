package com.smhrd.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MyUser {
   
	@JsonProperty("mb_id")
   private String id;
	@JsonProperty("mb_pw")
   private String pw;
	
   
   
   @Override
   public String toString() {
	   return "MyUser [id=" + id + ", pw=" + pw + ", getId()=" + getId() + ", getPw()=" + getPw() + "]";
   }
   public MyUser() {
      
   }
   public MyUser(String id, String pw, String role) {
      super();
      this.id = id;
      this.pw = pw;
   }
   public String getId() {
      return id;
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
   
   
   

}
