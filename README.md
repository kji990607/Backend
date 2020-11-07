# Backend

#### DB 세팅<br>

users-cycles, dates, pills가 다 1:N 관계이고 userId로 연결<br>
1 `.env`파일 생성 후 아래 내용 그대로 저장

```
DB_SECRET=[로컬 mysql 비밀번호]
COOKIE_SECRET=passengers
```

2 터미널에 `sequelize db:create` 명령어로 DB 생성

#### authRouter: 회원가입, 로그인, 로그아웃

#### CORS 에러 해결
