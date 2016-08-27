var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';


router.post('/',function(req,res){
  var pet = req.body;
  console.log('request reached',pet);
  console.log("reached");

  pg.connect(connectionString, function(err,client,done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    };
    client.query('INSERT INTO favpets(name,image,description)'
      +'VALUES($1,$2,$3)',
      [pet.name,pet.photo,pet.description],
        function(err,result){
          done();
          if (err){
            console.log(err);
            res.sendStatus(500);
          }
          else{res.sendStatus(201);
        }
        });
  });
});

router.get('/', function(req, res){
console.log("get request reached!")
  pg.connect(connectionString, function (err, client, done){
    if (err){
      res.sendStatus(500);
    }


    client.query('SELECT * FROM favpets;', function (err, result){
      console.log("post request");
      done();

      if (err){
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

module.exports = router;
