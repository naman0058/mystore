var express = require('express')
var pool = require('./pool')
var router = express.Router()
var table = 'category';
var upload = require('./multer');

router.get('/', (req, res) => {
    res.render(`${table}/index`);
})

router.post('/insert', upload.single('logo'), (req, res) => {
    let body = req.body;
    body['logo'] = req.file.filename
    pool.query(`insert into ${table} set ?`, body, (err, result) => {
        if(err) throw err;
        else res.redirect('/category')
    })
})

router.get('/all', (req, res) => {
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
    console.log(req.body)
    pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

module.exports = router;