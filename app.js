var feathers = require('feathers')
var bodyParser = require('body-parser');
var rest = require('feathers-rest');
var service = require("feathers-mongodb");
var MongoClient = require('mongodb').MongoClient;
var app = feathers();

app.configure(rest());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

MongoClient.connect('mongodb://localhost:27017/feathers').then(function(db){
  app.use('/cars', service({
    Model: db.collection('cars')
  }));

  app.use('/marcas', service({
    Model: db.collection('marcas')
  }));

  app.listen(3030,function(){
    console.log('servidor iniciado')
  });
});
