var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var table = 'users';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystore',
  connectionLimit:100,
  multipleStatements:true
})

/* GET home page. */

router.get('/', (req, res) => {
   var query1 = `select * from category;`
   var query2 = `select s.*,(select c.name from category c where c.id = s.categoryid) as categoryname from subcategory s;`
   var query3 = `select p.*,(select c.name from category c where c.id = p.categoryid) as categoryname,(select s.name from subcategory s where s.id = p.subcategoryid) as subactegorname from product p;`
   pool.query(query1+query2+query3,(err,result)=>{
  if(err) throw err
  else{
    
    res.render(`${table}/mystore`,{result:result})
  }
  
})
})
module.exports = router;
