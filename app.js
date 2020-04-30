//jshint esversion:6

//Settings
const express = require('express');
const app = express();
const date = require(__dirname + "/date.js");

app.use(express.urlencoded({
  extended: true
}));
//Static Folder for CSS and Images
app.use(express.static('public'));
// EJS Settings

app.set('view engine', 'ejs');
const newItems = ['test'];
const workItems = [];
//Main
app.get('/', function(req, res) {
  //Get date

  console.log(date.getDate());
  console.log(newItems);
  res.render('list', {
    listTitle: date.getDate(),
    items: newItems
  });


});

//Work Page
app.get("/work", function(req,res){
  res.render("list", {
    listTitle: "Work",
    items: workItems
  });
});

app.get("/about", function(req,res) {
  res.render("about");
})

// Post responses
app.post('/', function(req,res) {
  //Work
  console.log(req.body);
  if (req.body.button === 'Work'){
    workItems.push(req.body.newItem);
    console.log(workItems);
    res.redirect("/work");

  }else{ // Main List
    newItems.push(req.body.newItem);
    console.log(newItems);
    res.redirect("/");
  }

});





//Server Listen
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening to port 3000');
});
