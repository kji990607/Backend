# Backend
#### [정인] DB 세팅<br>
여기까지 master브랜치<br>
users-cycles,dates,pills가 다 1:N 관계이고 userId로 연결<br>
1. `.env`파일 생성 후 `DB_SECRET=[로컬 mysql 비밀번호]` 저장
2. 터미널에 `sequelize db:create` 명령어로 DB 생성

#### [정인] authRouter: 회원가입, 로그인, 로그아웃
develop/feature/auth