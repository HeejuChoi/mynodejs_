const express = require("express");  // express로 변수 선언해서 express 설치한 것을 가지고 옴 
const app = express();  // express를 실행해서 app이라는 변수에 대입  
//127.0.0.1 // 우리가 이 express를 몇 번 방에서 실행할건지(포트번호)를 지정해줘야 실행이 됨 / 3000번이라는 포트를 지정해주기

const router = require("./router/router.js"); 
// router.js에서 module까지 읽었을 때 다시 돌아오는 것을 받기 위해 const router로 선언해준다. 

// body-parser : post 방식을 분석할 수 있는 함수 
// 가지고 오는 부분이 있고 미들웨어를 선언하는 부분이 있음 
const bodyparser = require("body-parser");

// body-parser가 가진 내장된 설정은 잘 사용하지 않아서 
// post방식일 때 body 영역을 분석해주는 미들웨어로 bodyparser 등록 
// 밑에 router 등록하기 전에 이거 먼저 등록해야함 
app.use(bodyparser.urlencoded({extended:false}));

app.use(router); // 미들웨어로 router 등록 / 등록을 해줘야 쓸 수 있음 

app.listen(3000); // 현재 서버파일의 포트 번호 설정 


// ex01.html에서 client가 실행 -> submit 버튼 누르면 입력된 num1, num2 값이 넘어감
// -> 서버가 가진 방 중에서 3000번이라는 포트 방으로 들어감 -> 그안에 /plus라는 라우터로 들어감 
// -> 라우터 안에 있는 request의 .query라는 기능으로 num1, num2를  ... 

// 할 때 라우터를 먼저 만들어주기 ?