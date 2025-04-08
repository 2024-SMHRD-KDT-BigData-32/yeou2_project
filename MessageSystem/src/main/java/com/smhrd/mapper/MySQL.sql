-- Member 테이블 생성
-- 실행 : 실행 쿼리문 전체 블록 → ALT + x
CREATE TABLE MEMBER (
	EMAIL VARCHAR(100) NOT NULL,
	PW VARCHAR(100) NOT NULL,
	TEL VARCHAR(100) NOT NULL,
	ADDRESS VARCHAR(100) NOT NULL,
	PRIMARY KEY(EMAIL)
);

-- TEST 데이터 삽입하기
INSERT INTO MEMBER VALUES ("ADD@GOOGLE.COM", "12345", "010-1111-1111", "광주");

SELECT * FROM MEMBER WHERE EMAIL = 44 AND PW = 44;

DELETE FROM MEMBER WHERE EMAIL = '44';

-- 조회하기
SELECT * FROM MEMBER;



delete from member where email = "rlaqkdn35@naver.co"
-- board테이블 생성
-- idx, title, writer, filename, content, b_data
-- idx는 프로그램이 알아서 1씩 증가시킬거임 → AUTO_INCREMENT
CREATE TABLE BOARD (
	IDX INT NOT NULL AUTO_INCREMENT,
	TITLE VARCHAR(100) NOT NULL,
	WRITER VARCHAR(100) NOT NULL,
	FILENAME VARCHAR(100),
	CONTENT VARCHAR(1000) NOT NULL,
	B_DATA DATETIME DEFAULT NOW(), -- 현재 시간을 입력하도록 디폴트값 작성
	PRIMARY KEY (IDX)
);

-- 테스트 데이터 삽입
INSERT INTO BOARD(TITLE, WRITER, FILENAME, CONTENT) VALUES ("나는 누구?", "김김박염", "나", "나는 바보입니다. 스프링 이해 했는데 잘모르겠습니다. 그래서 저는 바보랍니다.. 누군진 모르지만 장난인거 알지?ㅋㅋㅋ");
INSERT INTO BOARD(TITLE, WRITER, FILENAME, CONTENT) VALUES ("나는 염라", "염x빈", "나", "나는 항상 아이들을 혼내지 하지만 아이들은 말을 듣지 않지 이제는 몽둥이가 필요한 시간...");
INSERT INTO BOARD(TITLE, WRITER, FILENAME, CONTENT) VALUES ("나는 현진", "박x진", "누", "나는 항상 바쁘다. 자격증 공부도 해야하고 여친도 만나야하고 주말엔 학교가고 김x수랑 놀시간이 없다...");
INSERT INTO BOARD(TITLE, WRITER, FILENAME, CONTENT) VALUES ("나는 소중", "김x중", "너", "나는 항상 염모씨께 혼난다.. 그래도 괜찮다. 소중이니까..");

SELECT * FROM BOARD;




CREATE TABLE TEAM (
	USERNAME VARCHAR(100),
	EMAIL VARCHAR(100),
	PASSWORD VARCHAR(100)
);

select * from team;