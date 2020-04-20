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
//Main
app.get('/', function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Frydat', 'Saturday'];

  //Verify if the currentDay is a Valid day of the Week
  if (currentDay > 6 || currentDay < 0){
    res.render('list',{
      kindOfDay: 'ERROR: Day of the Week is not a Valid Value!'
    })
  }else{
    res.render('list', {
      kindOfDay: daysOfTheWeek[currentDay]
    });
  }

});


//Server Listen
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening to port 3000');
});
