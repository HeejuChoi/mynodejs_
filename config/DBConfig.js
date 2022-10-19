const mysql = require("mysql"); // mysql을 가져와서 사용하겠다. 


let conn = mysql.createConnection({   // 이코드가 실행되는 순간 DB로 감 
    // -> 아래 정보를 보고 승인되면 conn이라는 변수를 쓰면 mysql 쓸 수 있음 
    host : "127.0.0.1",
    user : "root",
    password : "gjaischool",
    port : "3306",   // 기본적으로 이 번호로 설정됨
    database : "nodejs_db"
})


module.exports = conn;