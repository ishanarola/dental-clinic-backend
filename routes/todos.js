var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    let db = req.con;
    db.query("SELECT * FROM to_dos", (err, rows) => {
        console.log(rows);
        console.log(err);
        res.json({ status: 200, todos: rows })
    })
})

router.post("/add", (req, res, next) => {
    let db = req.con;
    db.query("INSERT INTO to_dos(id,user_id,title,description) values (NULL," + req.body.user_id + ",'" + req.body.title + "','" + req.body.description + "')", (err, rows) => {
        console.log(rows);
        console.log(err);
        if(rows.affectedRows===1){
            res.status(200).json({ status: 200,message:"Task added successfully.", data: {id:rows.insertId} })
        }
        else{
            res.status(500).json({status:500,message:"Something went wrong."})
        }
    })
})

module.exports = router;