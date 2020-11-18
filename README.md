# Backend

### ★ 실행방법
1 `.env`파일 생성 후 아래 내용 그대로 저장

```
DB_SECRET=[로컬 mysql 비밀번호]
COOKIE_SECRET=passengers
```

2 터미널에 `sequelize db:create` 명령어로 DB 생성

### ★ 11/11 기준 DB 구조
<img width="501" alt="DB" src="https://user-images.githubusercontent.com/62373386/98750231-c1812b80-2400-11eb-8f6a-604114582d0d.PNG">

### ★ time
[참고 링크](https://flymogi.tistory.com/entry/nodejs-%ED%95%9C%EA%B5%AD-%EC%8B%9C%EA%B0%84-%EA%B5%AC%ED%95%98%EA%B8%B0)

### ★ feature/calendar/main
dateCondition이 여러개라 테이블 분리해야하긴한데 굳이 그럴 필요가 있을까 하는 고민.<br>
프런트 처리 미완료. 시간 걸릴 예정이라 develop에 merge함. 
