//jshint esversion:6

//Settings
const express  = require('express');
const app = express();

app.use(express.urlenconded({extended: true}));

app.use(express.static('public'));

//Main



//Server Listen
app.listen(process.env.PORT || 3000, function(){
  console.log('Server listening to port 3000');
})
