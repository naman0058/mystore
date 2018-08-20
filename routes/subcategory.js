var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var table = 'subcategory';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mystore'
})

router.get('/', (req, res) => {
    res.render(`${table}/index`);
})



router.post('/insert', (req, res) => {
    pool.query(`insert into ${table} set ?`, req.body, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.get('/all', (req, res) => {
    pool.query(`select s.id,s.categoryid,(select c.name from category c where c.id=s.categoryid) as cname,s.name,s.description,s.logo,s.created_date  from ${table} s`, (err, result) => {
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
    pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})




module.exports = router;