const express = require("express");
// const mysql = require("mysql"); // mysql을 가져와서 사용하겠다.  // DBconfig파일로 따로 만들면 여기서 안씀 
const conn = require("../config/DBConfig.js")  // require로 주소에 보냈다가 다시 그 내용을  conn으로 여기서 받아줌

const router = express.Router(); // express가 가진 기능 중 router를 사용하겠다 선언

// DBconfig파일로 따로 만들면 여기서 안씀 
// let conn = mysql.createConnection({   // 이코드가 실행되는 순간 DB로 감 
//     // -> 아래 정보를 보고 승인되면 conn이라는 변수를 쓰면 mysql 쓸 수 있음 
//     host : "127.0.0.1",
//     user : "root",
//     password : "gjaischool",
//     port : "3306",   // 기본적으로 이 번호로 설정됨
//     database : "nodejs_db"
// })

router.get("/plus", function(request, response){ // /plus 라우터 기능정의 및 등록
    console.log("/plus 라우터 호출")
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));
    // 여기까지해서 사용자로부터 정보를 받았다. parseInt 쓰는 이유는 문자열로 받았기 때문에 정수로 바꿔서 더해주기 위해서 

    // 응답
    // 1번: 우리에게 보이지 않는 html 공백이 생긴다. 응답해야하는 파일 지정 
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"}); // text/html로 된 페이지로 응답한다. / 응답방식 utf-8이다. 
    // 2번: 응답해야되는 파일에 html 코드를 작성한다. 
    response.write("<html>");
    response.write("<body>");
    response.write("응답성공<br>");
    response.write("결과값 :" + (parseInt(request.query.num1)+parseInt(request.query.num2))); // 연산한 값에 소괄호 -> 문자랑 같이 더해지면 뒤가 문자로 인식되기 때문에 소괄호 추가함
    response.write("</body>");
    response.write("</html>");
    response.end(); // 3번: 완성된 html 코드가 그대로 사용자에게 전달이 된다.(응답) 
});

router.get("/cal", (request,response) => { // /cal 라우터 기능정의 및 등록
    // 1. 사용자가 입력한 값을 가져오기 
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1+ cal + num2);

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하시오. 
    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    response.write("<html>");
    response.write("<body>");

    if (cal == "+") {
        response.write("결과값: " + (parseInt(num1)+parseInt(num2)))
    } else if (cal == "-"){
        response.write("결과값: " + (parseInt(num1)-parseInt(num2)))
    } else if (cal == "*"){
        response.write("결과값: " + (parseInt(num1)*parseInt(num2)))
    } else 
        response.write("결과값: " + (parseInt(num1)/parseInt(num2)))
    response.write("</body>");
    response.write("</html>");
    response.end();
});

// post 방식으로 보낸다했는데 get으로 적어놓으면 아예 무시하고 지나감 
// post 방식일 때는 미들웨어를 따로 등록해줘야함 
router.post("/Grade", (request, response) => {

    let avg = (parseInt(request.body.java) + parseInt(request.body.web) 
    + parseInt(request.body.iot) + parseInt(request.body.android))/ 4

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    response.write("<html>");
    response.write("<body>");
    response.write("이름 : " + (request.body.name) + "<br>");
    response.write("자바 : " + (request.body.java) + "<br>");
    response.write("웹 : " + (request.body.web) + "<br>");
    response.write("IoT : " + (request.body.iot) + "<br>");
    response.write("안드로이드 : " + (request.body.android) + "<br>");
    
    response.write("평균값 : " + avg + "<br>");
    if (avg >=95) {
        response.write("grade : A+")
    } else if (avg >=90) {
        response.write("grade : A")
    } else if (avg >=85) {
        response.write("grade : B+")
    } else if (avg >=80) {
        response.write("grade : B")
    } else if (avg >=75) {
        response.write("grade : C")
    } else {
        response.write("grade : F")
    }

    response.write("</body>");
    response.write("</html>");
    response.end();

})


// ex04.join
router.post("/join", (request, response) => {

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
    response.write("<html>");
    response.write("<body>");

    response.write("ID : " + (request.body.id) + "<br>");
    response.write("NAME : " + (request.body.name) + "<br>");
    response.write("EMAIL : " + (request.body.email) + "<br>");
    response.write("TEL : " + (request.body.tel) + "<br>");
    response.write("GENDER : " + (request.body.gender) + "<br>");
    response.write("COUNTRY : " + (request.body.country) + "<br>");
    response.write("BIRTH : " + (request.body.birth) + "<br>");
    response.write("COLOR : " + (request.body.color) + "<br>");
    response.write("HOBBY : " + (request.body.hobby) + "<br>");
    response.write("TALK : " + (request.body.talk) + "<br>");

    response.write("</body>");
    response.write("</html>");
    response.end();

})


// ex05.Login
router.post("/Login", (request, response) => {

    let id = request.body.id;
    let pw = request.body.pw;

    // response.redirect => 이미 만들어진 페이지로 이동시켜줌 
    //response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");  // 성공한 페이지 주소 붙여넣기

    // 사용자가 입력한 id가 'smart'이고, pw가 '123'이었을 때 
    // 성공 -> LoginS.html
    // 실패 -> LoginF.html
    // 조건문 활용
//     if (id == "smart" && pw =="123") {
//         response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");
//     } else {
//         response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
//     }
// });


    // 지정된 값이 아닌 입력한 값으로 로그인하기 
    let sql = "SELECT * from member where id = ? and pw = ?";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, [id, pw], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라  
            // 검색된 데이터가 있음 -> 로그인 성공
            response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginS.html");
            
        } else if (row.length == 0) { 
            // 검색된 데이터가 없음 -> 로그인 실패
            response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex05LoginF.html");
            
        }
        
    })

});

// ex06 Join

router.post("/JoinDB", (request, response) => {

    let id = request.body.id;
    let pw = request.body.pw;
    let nick = request.body.nick;

    let sql = "insert into member values(?, ?, ?)";
    // 사용자가 입력한 값 넣으려면 ?를 넣어준다. 
    // 물음표 순서대로 변수를 아래 대괄호에 작성해준다.
    conn.query(sql, [id, pw, nick], (err, row) => {  // 어떤 sql문을 db에 날릴 건지 / 실패 혹은 성공했을 때 어떤걸 보여줄건지
        if(!err){ // err에 아무런 값이 없다면? (성공일 때)
            console.log("입력성공 : " + row);
            response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html"); 
            // 입력성공 후 사용자는 메인페이지로 보내줌
        } else {
            console.log("입력실패 : " + err);
        }

    })


});


// ex06 회원삭제라우터만들기
// 1. get방식의 /Delete라우터 생성
// 2. 사용자가 입력한 id값 가져오기
// 3. id값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html로 돌아가기 
router.get("/Delete", (request, response) => {
    
    let id = request.query.id;

    let sql = "DELETE FROM member where id = ?";

    // conn.query(sql, [id], (err, row) => {
    //     if (row.affectedRows > 0){     // 삭제한 값이 1이상 일 때 (올바른 id값을 넣어서 삭제가 된 경우)
    //         console.log("명령에 성공한 횟수 : " + row.affectedRows);   // affectedRows : 명령에 성공한 횟수를 나타냄
    //         response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
    //     } else if (row.affectedRows == 0) { // 올바른 id값을 넣지 않아서 삭제가 되지 않은 경우
    //         console.log("삭제된 값이 없습니다.")
    //     } else {            // 그냥 안된 경우
    //         console.log("삭제실패 : " + err);
    //     }

    // 위 내용대로 안한 이유 
    // -> 처음에 err가 생기면 row 자체가 만들어지지 않는다. 그래서 if문 자체가 실행이 안된다
    // -> 그래서 먼저 err가 생겼을 때의 처리를 해줘야한다 

        conn.query(sql, [id], (err, row) => {
            if (err){    
                console.log("삭제실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
                
            } else if  (row.affectedRows == 0) {           
                console.log("삭제된 값이 없습니다.")
            }
    })

});


// ex06 회원수정라우터 만들기
router.post("/Update", (request, response) => {
    
    // 사용자가 입력한 id의 pw를 변경하고
    // 성공 후  Main.html 페이지로 이동하시오. 

    let id = request.body.id;
    // let pw = request.body.pw;
    let select = request.body.select; // pw or nick 값이 넘어옴 // pw인지 nick인지 확인해주는 것
    let data = request.body.data; // 변경될 데이터 값이 넘어옴

    // let sql = "UPDATE member set pw=? where id = ?;";
    // UPDATE set 어떻게 바꿀건지 where 어떤 데이터를 바꿀건지 (UPDATE 일 때 set, where은 같이감) 
    // column 명은 ? 처리 할 수 없음 (이미 정해져있는 값이라서)

    let sql = ""

        if (select == "pw") {
            sql="UPDATE member set pw=? where id = ?"  // sql 은 중괄호 안에서만 쓸 수 있는 지역변수이다. 
            // 그래서 밖에 비어있는 sql문에 문자열을 대입해줌 
        } else if (select == "nick" ) {
            sql="UPDATE member set nick=? where id = ?"
        }

    //     conn.query(sql, [pw, id], (err, row) => {
    //         if (err){    
    //             console.log("수정실패 : " + err); 
                
    //         } else if (row.affectedRows > 0) {
    //             console.log("명령에 성공한 횟수 : " + row.affectedRows); 
    //             response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
                
    //         } else if  (row.affectedRows == 0) {           
    //             console.log("수정된 값이 없습니다.")
    //         }
    // })

        conn.query(sql, [data, id], (err, row) => {
            if (err){    
                console.log("수정실패 : " + err); 
                
            } else if (row.affectedRows > 0) {
                console.log("명령에 성공한 횟수 : " + row.affectedRows); 
                response.redirect("http://127.0.0.1:5500/mynodejs_/public/ex06Main.html");
                
            } else if  (row.affectedRows == 0) {           
                console.log("수정된 값이 없습니다.")
            }
    })

    // let sql = `unpdate member ser ${select} = ? where id = ?}`;
    // 이 방식 대로 하면 굳이 if문을 쓰지 않아도 사용자가 설정한 값으로 해서 변경돼서 진행할 수 있음 


});


// selectAll 전체회원검색
// post는 html에 post로 지정해줘야 가능함 
// 그래서 지정 안할 때는 get방식으로 진행한다. 

router.get("/SelectAll", (request, response) => {

    let sql = "SELECT * from member";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);

            
            // view 엔진 없이는 이대로 출력할 수 없음 그래서 일단 불편하게 html 만들어서 출력해보기
            response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
            response.write("<html>");
            response.write("<body>");
            response.write("<table border='1'>"); // table은 무조건 tr(table row) td(table data) 가 같이 있어야함
            response.write("<tr>");
            response.write("<th>ID</th>"); // td : table head
            response.write("<th>PW</th>");
            response.write("<th>NICK</th>");
            response.write("</tr>");


            for (let i=0;i<row.length;i++) {
                response.write("<tr>");
                response.write("<td>" + row[i].id + "</td>");
                response.write("<td>" +row[i].pw + "</td>");
                response.write("<td>" +row[i].nick + "</td>");
                response.write("</tr>");

            }

            response.write("</table>");
            response.write("</body>");
            response.write("</html>");
            response.end(); 

        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
        }
        
    })



});

// ex06 selectOne 회원검색라우터 만들기
// 1. get 방식의 /SelectOne라우터 생성
// 2. 사용자가 입력한 id의 정보만 검색해서 브라우저 출력하시오. 

router.get("/SelectOne", (request, response) => {
    let id = request.query.id; // 사용자의 정보를 받기 때문에 꼭 선언해줘야함
    let sql = "SELECT * from member where id = ?";  // 안에 세미콜론 넣으면 안됨

    conn.query(sql, [id], (err, row) => {  // 에러나면 err값이 차고, 성공하면 row값이 참

        if(err) {
            console.log("검색실패 : " + err);

        } else if (row.length > 0) {   // DB에 있는 row에 값이 있다면 출력해라 
            console.log("검색된 데이터의 수 : " + row.length);

            
            // view 엔진 없이는 이대로 출력할 수 없음 그래서 일단 불편하게 html 만들어서 출력해보기
            response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
            response.write("<html>");
            response.write("<body>");
            response.write("<table border='1'>"); // table은 무조건 tr(table row) td(table data) 가 같이 있어야함
            response.write("<tr>");
            response.write("<th>ID</th>"); // td : table head
            response.write("<th>PW</th>");
            response.write("<th>NICK</th>");
            response.write("</tr>");


            for (let i=0;i<row.length;i++) {
                response.write("<tr>");
                response.write("<td>" + row[i].id + "</td>");
                response.write("<td>" +row[i].pw + "</td>");
                response.write("<td>" +row[i].nick + "</td>");
                response.write("</tr>");

            }

            response.write("</table>");
            response.write("</body>");
            response.write("</html>");
            response.end(); 

        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다.");
            response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"})
            response.write("<html>");
            response.write("<body>");
            response.write("<h1>검색 실패</h1>");
            response.write("</body>");
            response.write("</html>");
            response.end()
        }
        
    })
})





// 현재 선언된 router를 외부에서 사용할 수 있게 선언해주는 것 
module.exports = router;