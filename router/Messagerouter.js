
const { response } = require("express");
const express = require("express"); // router를 쓰기 위해 express를 가지고 옴
const Messagerouter = express.Router();
const conn = require("../config/DBConfig")

// *** 자주하는 실수(빼먹지 말고 하기!!)
// 1. app.js에 미들웨어 등록해줘야함
// 2. DB정보등록(conn)

Messagerouter.get('/Message', (request, response) => {

    // (추가!) 현재 로그인한 사람에게 온 메세지를 검색
    let sql = "select * from web_message where rec = ?";

    // session의 값이 있을 때만 조회한다
    if(request.session.user) {
        conn.query(sql, [request.session.user.email], (err, row) => {
            console.log(row);
            
            // 이 곳의 row는 web_message에 들어 있는 row (send, content, send_date.. )
            response.render("message", {
                user : request.session.user,
                row_name : row
            });
        })

    } else {  
        // 로그인이 안됐을 때도 메인페이지로 보내주기 
        response.render("message", {
        user : request.session.user,
        }); 
    }
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

                // 로그인하고 검색될 수 있도록 Message 라우터로 렌더를 시켜줘야함(그래서 render말고 redirect로)
                response.redirect("http://127.0.0.1:3000/Message");
                // response.render("message", {
                //     user : request.session.user
                // })

                // console.log("성공이지롱");
                
            } else if (row.length == 0) { 
                // 검색된 데이터가 없음 -> 로그인 실패
                response.redirect("http://127.0.0.1:3000/Main");
                
            }
    })
    
});

// ejs파일을 불러오는 router
Messagerouter.get("/MessageUpdate", (request, response) => {
    
    // update.ejs 파일을 랜더링
    response.render("update", {
        user : request.session.user

    })
    



});

// DB에 가서 수정할 수 있게 하는 UpdataExe router
Messagerouter.post("/MessageUpdateExe", (request, response) => {

    // email은 사용자가 입력하지 않고 session에서 가지고 오기 때문에 email부분만 변경해야함
    let email = request.session.user.email;
    let pw = request.body.pw;
    let tel = request.body.tel;
    let address = request.body.address;


    // 사용자가 입력한 pw, tel, address로 email의 정보를 수정하시오. 
    
    let sql = "update web_member set pw=?, tel=?, address=? where email=?";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [pw, tel, address ,email], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("수정성공 : " + row);

            // update하면 데이터베이스만 변경되고 session은 로그인할 때 session이니 session도 바꿔줘야함
            // 이미 위에 변수에 담아놨기 때문에 그냥 변수로 작성해주면 된다. (그럼 새로 작성한 것으로 덮어씌워짐)
            // 이렇게 하면 DB 뿐만 아니라 session도 변경돼서 밑에 Email, Phone, Address는 user로 가져왔었기 때문에
            // 변경된 내용으로 바뀜 
            request.session.user = {
                "email" : email,
                "tel" : tel,
                "address" : address
            }
            response.redirect("http://127.0.0.1:3000/Message"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("수정실패 : " + err);
        }

    })
});

Messagerouter.get("/MessageMemberSelect", (request, response) => {

    let sql = "SELECT * from web_member"; 

    conn.query(sql, (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라  
            // 검색된 데이터가 있음 

            response.render("selectMember", {
                // row값을 row_name에 넣겠다 
                row_name : row
            })
            
        } else if (row.length == 0) { 
            // 검색된 데이터가 없음 
            response.redirect("http://127.0.0.1:3000/Message");
            
        }
})

});

// 바로 링크 탈 때는 get 방식!
Messagerouter.get("/MessageDelete", (request, response) => {
    
    // session으로 넣으면 admin에서만 삭제됨! / 그래서 query로 받아와야 지워짐 
    let email = request.query.email;

    let sql = "DELETE FROM web_member where email = ?";

        conn.query(sql, [email], (err, row) => {
            if (err){    
                console.log("삭제실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                response.redirect("http://127.0.0.1:3000/MessageMemberSelect");
                // 위 링크를 추가하면 바로 삭제된 것처럼 보임 
                
            } else if  (row.affectedRows == 0) {           
                console.log("삭제된 값이 없습니다.")
            }
    })

});

Messagerouter.post("/MessageSend", (request, response) => {

    let send = request.body.send;
    let rec = request.body.rec;
    let content = request.body.content;


    let sql = "insert into web_message (send, rec, content, send_date) values(?, ?, ?, now())";
    conn.query(sql, [send, rec, content], (err, row) => { 
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:3000/Message"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("입력실패 : " + err);
        }

    })
});


module.exports = Messagerouter;