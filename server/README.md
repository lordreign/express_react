<!-- https://victorydntmd.tistory.com/26 -->

## Sequelize 전역 설치
```
npm install -g sequelize-cli
```
<br>
<hr>
<br>

## 명령어
```
sequelize db:create
sequelize model:create --name TABLE_NAME
sequelize seed:generate --name SEED_NAME

sequelize db:migrate > seed 돌리기전 필요
sequelize db:seed:all

sequelize db:seed:undo:all > seed 되돌리기
```