var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
//connect database
mongoose.connect('mongodb://Moode:moode@ds217138.mlab.com:17138/todo-list');
//Create a schema -this like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });

  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view adn add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    // delete the requested item from mongodb
    console.log(req.params.item);
    console.log(req.params.item.replace(/\-/g, " "));
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
      if(err) throw err;
       res.json(data);
    });
  });
}
