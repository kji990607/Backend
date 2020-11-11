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
DB 테이블에 생성, 수정시간 삭제. 필요하면 말해줘<br>
기본 세팅이 한국 시간이 아니라서 9시간 전으로 나옴.<br>
현 시점에선 알람시간을 시/분으로 나눈후 INT형으로 저장해서 필요없긴한데 이 링크로 해결 가능
[참고 링크](https://flymogi.tistory.com/entry/nodejs-%ED%95%9C%EA%B5%AD-%EC%8B%9C%EA%B0%84-%EA%B5%AC%ED%95%98%EA%B8%B0)