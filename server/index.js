const express = require("express")

const app = express()

// 跨域模块
app.use(require('cors')())
// json模块
app.use(express.json())

// module.exports 返回一个函数
require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})