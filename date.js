//jshint esversion:6

exports.getDate = function() {
  const today = new Date();


  //set Locale options
  const options = {
    day: "2-digit",
    weekday: "long",
    month: "long",

  }
  return today.toLocaleDateString("en-GB", options);
};
