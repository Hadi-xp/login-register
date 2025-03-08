const express = require('express');
const app = express();
app.use(express.json);
const config = require('config');
const {body,validationResault} = require('express-validator');








app.listen(config.get('serverPort'),()=>{console.log(`server is runing on port ${config.get('serverPort')}`)});