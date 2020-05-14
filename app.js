//jshint esversion:6

//Settings
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');
const dotenv = require('dotenv');
// const date = require(__dirname + "/date.js"); //When you want to use date

dotenv.config();
app.use(express.urlencoded({
  extended: true
}));
//Static Folder for CSS and Images
app.use(express.static('public'));

//Mongose Settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb://admin-vinicius:${process.env.ACCESS_DB}@cluster0-shard-00-00-fe285.mongodb.net:27017,cluster0-shard-00-01-fe285.mongodb.net:27017,cluster0-shard-00-02-fe285.mongodb.net:27017/todolistDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`);

itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemSchema);

const testItem = new Item({
  name: 'Welcome to the Base Test!!!'
});
const testItem2 = new Item({
  name: '<-- Click Here to Make me Disappear.'
});
const testItem3 = new Item({
  name: 'Click the + sign to add Anothe To-Do!'
});

const defaultArray = [testItem, testItem2, testItem3];

const listSchema = new mongoose.Schema ({
name: String,
items: [itemSchema]
});

const List = mongoose.model("List", listSchema);

// EJS Settings
app.set('view engine', 'ejs');




app.get('/', function(req, res) {



  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      console.log('Everything Okay on Finding Elements!');
      console.log(items);
      //Default Settings
      if (items.length === 0) {
        Item.insertMany(defaultArray, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Successfully saved default items to DB!');
            res.redirect('/');
          }
        });
      } else {
        res.render('list', {
          // listTitle: date.getDate() // Date off
          listTitle: "Today",
          items: items
        });
      }


    }
  });



});

app.get('/:id', function(req, res) {
  const customListName = _.capitalize(req.params.id);
  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if (foundList){
        res.render("list", {
          listTitle: foundList.name,
          items: foundList.items
        });

      }else{
        console.log("Doesnt Exist");
        const list = new List ({
          name: customListName,
          items: defaultArray
        });

        list.save();

        res.redirect(`/${_.lowerCase(req.params.id)}`)
      }
    }
  })


});

app.get("/about", function(req, res) {
  res.render("about");
})

// Post responses
app.post('/', function(req, res) {
  const listName = req.body.buttonSubmit;
  const item = req.body.newItem;
  const newItem = new Item({
    name: item
  });
  console.log(listName);
  if (listName === "Today"){

    newItem.save();
    res.redirect('/');


  }else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect(`/${_.lowerCase(listName)}`);
    });
  }

});


app.post('/delete', function(req, res) {
  console.log(req.body.checkBox);
  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;
  if (listName === "Today"){
    Item.findByIdAndDelete(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Item deleted Successfully!');
        res.redirect('/');
      }

    });
  }else {
    //Delete drom specified list
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId} } },function(err,foundList){
      if(!err){
        res.redirect(`/${_.lowerCase(listName)}`);
      }
    });
  }



});

app.post('/newList', function(req,res){
  console.log(req.body.newList);
});





//Server Listen
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening to port 3000');
});
