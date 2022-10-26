const express = require("express");
const router = express.Router();

router.get("/ex01", (request, response) => {
    console.log(request.query)  // 사용자가 html에서 입력한거를 query에 담아옴 
    // 세션 등록하기
    // 세션보다 응답이 먼저면 응답을 먼저해버리기 때문에 안됨 
    // 사용자의 브라우저 안에 세션으로 저장할 거라 request
    request.session.user = {
        name : request.query.userName
    }

    console.log(request.session.user.name)

    // 응답 : ex01.ejs를 보내줄 것 / ex01.ejs라는 파일을 랜더해준다. 
    response.render("ex01", {
        name : request.query.userName,
        season : request.query.season
    })
   
});

router.get("/ex02", (request, response) => {
    console.log('ex02 router')

    delete request.session.user
})


module.exports = router;