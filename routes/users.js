var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function (req, res, next) {
  res.send({ test: 'respond with a profile' });
});

router.get('/', (req, res, next) => {
  var db = req.con;
  db.query('SELECT * FROM users', (err, rows) => {
    // console.log("outside"+data.id);
    res.json({ title: 'user information', dataGet: rows })
  })
})

router.post('/addUser', (req, res, next) => {
  var db = req.con;
  db.query("INSERT INTO users (id,name, email, token) VALUES (NULL, '" + req.body.name + "', '" + req.body.email + "', NULL)", (err, rows) => {
    res.json({ title: "User added successfully." })
  })
})

router.get('/getLoggedInUser/:email', (req, res, next) => {
  var db = req.con;
  db.query("SELECT * FROM users WHERE email='" + req.params.email + "'", (err, rows) => {
    console.log("rows", rows);
    if (rows.length > 0) {
      res.status(200).json({ message: "User details fetched successfully.", status: 200, user: rows[0] });
    }
    else{
      res.status(404).json({status:"404",message:"User not found."})
    }
  })
})

module.exports = router;
