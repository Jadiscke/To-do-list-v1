//jshint esversion:6

//Settings
const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: true
}));
//Static Folder for CSS and Images
app.use(express.static('public'));
// EJS Settings

app.set('view engine', 'ejs');
let newItems = ['test'];
let workItems = [];
//Main
app.get('/', function(req, res) {
  //Get date
  let today = new Date();


  //set Locale options
  let options = {
    day: "2-digit",
    weekday: "long",
    month: "long",

  }
  let fullDate = today.toLocaleDateString("en-GB",options);
  let dayOfTheWeek = fullDate.split(",")[0];
  console.log(dayOfTheWeek);
  console.log(newItems);
  res.render('list', {
    listTitle: fullDate,
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
