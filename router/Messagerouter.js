
const { response } = require("express");
const express = require("express"); // router를 쓰기 위해 express를 가지고 옴
const Messagerouter = express.Router();
const conn = require("../config/DBConfig")

// *** 자주하는 실수(빼먹지 말고 하기!!)
// 1. app.js에 미들웨어 등록해줘야함
// 2. DB정보등록(conn)

Messagerouter.get('/Message', (request, response) => {

    response.render("message", {
        user : request.session.user
    });

})

Messagerouter.get('/MessageLogout', (request, response) => {
    delete request.session.user;
    response.redirect("http://127.0.0.1:3000/Message");
})

Messagerouter.post("/MessageJoin", (request, response) => {

        let email = request.body.email;
        let pw = request.body.pw;
        let tel = request.body.tel;
        let address = request.body.address;
    
        let sql = "insert into web_member values(?, ?, ?, ?, now())";
        // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
        // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
        conn.query(sql, [email, pw, tel, address], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
            if(!err){ // err에 아무런 값이 없다면? (성공일 때)
                console.log("입력성공 : " + row);
                response.redirect("http://127.0.0.1:3000/Message"); 
                // 입력성공 후 사용자는 메인페이지로 보내줌
            } else {
                console.log("입력실패 : " + err);
            }
    
        })
});

    // Login기능 구현하시오.
    // 1. message.ejs에 form 수정
    // 2. MessageLogin라우터를 구현
    // 3. 로그인 성공 후 Message 페이지로 이동
Messagerouter.post("/MessageLogin", (request, response) => {

        let email = request.body.email;
        let pw = request.body.pw;

    
        // 지정된 값이 아닌 입력한 값으로 로그인하기 
        let sql = "SELECT * from web_member where email = ? and pw = ?";  // 안에 세미콜론 넣으면 안됨
    
        conn.query(sql, [email, pw], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참
    
            if(err) {
                console.log("검색실패 : " + err);
    
            } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라  
                // 검색된 데이터가 있음 -> 로그인 성공

                request.session.user = {
                    "email" : row[0].email,
                    "tel" : row[0].tel,
                    "address" : row[0].address
                };

                console.log("session영역에 id저장 성공" + request.session.user)

                response.render("message", {
                    user : request.session.user
                })
                // response.redirect("http://127.0.0.1:3000/Message");
                // console.log("성공이지롱");
                
            } else if (row.length == 0) { 
                // 검색된 데이터가 없음 -> 로그인 실패
                response.redirect("http://127.0.0.1:3000/Main");
                
            }
    })
    
});


module.exports = Messagerouter;