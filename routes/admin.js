express = require('express')
var mysql = require('mysql')
var router = express.Router()

var table = 'admin';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mystore'
})

router.get('/',(req,res)=>{
    res.render(`${table}/index`)
})


router.get('/check',(req,res)=>{
    const { email, password } = req.query
        //console.log(req.body.password)
        var query = `select * from admin where email='${email}' and password = '${password}' `
      
        pool.query(query, function (err, result, fields) {
            if (result[0])
                res.render(`category/index`)
          else
                res.render(`${table}/index`)
            
     })
     })

module.exports = router;