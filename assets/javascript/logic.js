// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train times - then update the html + update the database
// 3. Create a way to retrieve train time from the train database.
// 4. Create a way to calculate the specific train times. Using difference between train time and next arrival.
//    Then use moment.js formatting to set difference in frequency and minutes away.
// 5. Calculate Total billed

alert("We in this bih");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_8CrXgX1l45sGkQ7wKDplpL7BwksT77g",
    authDomain: "trainscheduler-gt.firebaseapp.com",
    databaseURL: "https://trainscheduler-gt.firebaseio.com",
    projectId: "trainscheduler-gt",
    storageBucket: "",
    messagingSenderId: "807420771827"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Train name
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destRole = $("#destination-input").val().trim();
    var firstTrainStart = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();

      // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destRole,
    start: firstTrainStart,
    rate: frequency;
  };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainStart);
    console.log(newTrain.frequency);

      // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destRole = childSnapshot.val().role;
    var firstTrainStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(destRole);
    console.log(firstTrainStart);
    console.log(frequency);

      // Prettify the train start
  var trainStartPretty = moment.unix(firstTrainStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  // Change below 3/31
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});