var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var table = 'product';

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

router.get('/showall', (req, res) => {
    
    const query = `select p.*, 
            (select c.name from category c where c.id=p.categoryid) as categoryname, 
            (select s.name from subcategory s where s.id=p.subcategoryid) as subcategoryname 
        from ${table} p`

    pool.query(query, (err, result) => {
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




router.get('/getsubcategory',(req,res)=>{
    const { categoryid } = req.query
    pool.query(`select * from subcategory where categoryid= '${categoryid}'`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})
module.exports = router;