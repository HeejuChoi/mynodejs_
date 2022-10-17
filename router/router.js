const { response } = require("express");
const express = require("express");

const router = express.Router(); // express가 가진 기능 중 router를 사용하겠다 선언

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

// 현재 선언된 router를 외부에서 사용할 수 있게 선언해주는 것 
module.exports = router;