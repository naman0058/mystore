var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var table = 'users';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mystore'
})

router.get('/', (req, res) => {
    res.render(`${table}/index`);
})

router.get('/mystore', (req, res) => {
    res.render(`${table}/mystore`)
})

router.post('/insert', (req, res) => {
    pool.query(`insert into ${table} set ?`, req.body, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})
/*
router.get('/show', (req, res) => {
    pool.query(`select * from ${table}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.get('/single', (req, res) => {
    const { id } = req.query
    pool.query(`select * from ${table} where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.get('/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from ${table} where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/update', (req, res) => {
    pool.query(`update ${table} set ?`, req.body, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})
*/
 router.post('/check',(req,res)=>{
const { email, password } = req.body
    //console.log(req.body.password)
    var query = `select * from users where email='${email}' and password = '${password}' `
  
    pool.query(query, function (err, result, fields) {
        if (result[0])
            res.render(`category/index`)
      else
            res.render(`${table}/index`)
        
 })
 })
module.exports = router;