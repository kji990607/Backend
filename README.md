# Backend
#### [정인] DB 세팅<br>
users-cycles,dates,pills가 다 1:M관계이고 userId로 연결<br>
1. `.env`파일 `DB_SECRET`에 로컬 mysql 비밀번호 넣어준 후
2. 터미널에 `sequelize db:create` 명령어 실행
3. 터미널에 `nodemon app` 명령어 실행<br>
=>`fullmoon`이라는 이름으로 데이터 베이스 생성<br>

해보고 구조 자료형 allownull unique 등등 수정사항 slack-백엔드 채널에 알려줘