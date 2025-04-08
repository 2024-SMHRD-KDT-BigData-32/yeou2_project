package com.smhrd.service;

import com.smhrd.entity.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemberService {

    private final Map<String, Member> memberDB = new HashMap<>();

    // 더미 데이터 추가 (테스트용)
    public MemberService() {
        memberDB.put("testUser", new Member("testUser", "1234", "홍길동", "길동이", "test@test.com", "M", null, "USER", null));
    }

    public Member findByMbId1(String mb_id) {
        return memberDB.get(mb_id);
    }
    
    @Autowired
    private MemberService memberRepository;

    public Member findByMbId(String mb_id) {
        return memberRepository.findByMbId(mb_id);
    }

    public void save(Member member) {
        memberRepository.save(member);
    }
    
    
}