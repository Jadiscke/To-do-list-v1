//jshint esversion:6

//Settings
const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));
// EJS Settings

app.set('view engine', 'ejs');
let newItems = ['test'];
//Main
app.get('/', function(req, res) {
  //Get date
  let today = new Date();
  

  //set Locale options
  let options = {
    day: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "long",

  }
  let fullDate = today.toLocaleDateString("en-GB",options);
  let dayOfTheWeek = fullDate.split(",")[0];
  console.log(dayOfTheWeek);
  console.log(newItems);
  res.render('list', {
    kindOfDay: fullDate,
    items: newItems
  });


});

app.post('/', function(req,res) {
  newItems.push(req.body.newItem);
  console.log(newItems);
  res.redirect("/");
});


//Server Listen
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening to port 3000');
});
