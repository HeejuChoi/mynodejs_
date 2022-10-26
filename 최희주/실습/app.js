const express = require("express");  
const app = express();  

let ejs = require('ejs');
const router = require("./ex01/router.js");

app.set('view engine', 'ejs');

app.use(router);

app.listen(3000,()=>{console.log('3000 server')}); 

