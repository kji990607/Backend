# Backend

### 📍 실행 방법
`.env` 파일 생성 후 아래 내용 저장
```
DB_SECRET=[로컬 mysql 비밀번호]
COOKIE_SECRET=passengers
```
아래 명령어 실행
```
$ npm install
$ sequelize db:create
$ npm start
```

### 📍 개발 환경
 node.js, mysql

### 📍 데이터베이스
![DB schema](https://user-images.githubusercontent.com/62373386/101015079-2e27ba00-35aa-11eb-8e01-7b900d0019aa.png)
users: 사용자 정보
<br/>
dates: 날짜 별 상세 정보
<br/>
cycles: 주기 정보
<br/>
controls: 피임약 알람 정보
<br/>
predicts: 예상 주기 정보


