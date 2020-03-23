var express = require('express'); //import express 
var app = express();
var firebase = require('firebase');
var bodyParser = require('body-parser');

var firebaseConfig = {
    apiKey: "AIzaSyD6IU8wcbpVyTJTCENcnbDZjDsMh3kQjM8",
    authDomain: "contact-management-54fd7.firebaseapp.com",
    databaseURL: "https://contact-management-54fd7.firebaseio.com",
    projectId: "contact-management-54fd7",
    storageBucket: "contact-management-54fd7.appspot.com",
    messagingSenderId: "35096843563",
    appId: "1:35096843563:web:e97df577b85897c764616e",
    measurementId: "G-16CEWLMBPP"
};

firebase.initializeApp(firebaseConfig);
app.use(bodyParser.json()); //need to parse HTTP request body

//Fetch instances
app.get('/', function (req, res) {

    console.log("HTTP Get Request");
    var userReference = firebase.database().ref("/Users/");

    userReference.orderByChild("username")
        .limitToFirst(6)
        .once("value")
        .then(function (snapshot) {
            res.json(snapshot.val());
            userReference.off("value");
        },
            function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                res.send("The read failed: " + errorObject.code);
            })

    //Attach an asynchronous callback to read the data
    // userReference.limitToFirst(5).on(
    //     "value",
    //     function (snapshot) {

    //         res.json(snapshot.val());
    //         userReference.off("value");
    //     },
    //     function (errorObject) {
    //         console.log("The read failed: " + errorObject.code);
    //         res.send("The read failed: " + errorObject.code);
    //     })
    // userReference.on("value",
    //     function (snapshot) {
    //         console.log(snapshot.val());
    //         res.json(snapshot.val());
    //         userReference.off("value");
    //     },
    //     function (errorObject) {
    //         console.log("The read failed: " + errorObject.code);
    //         res.send("The read failed: " + errorObject.code);
    //     });


});

function nextPage(last) {

    return ref.orderBy(field)
        .startAfter(last[field])
        .limit(pageSize);
}

function prevPage(first) {

    return ref.orderBy(field)
        .startAfter(first[field])
        .limitToLast(pageSize);
}

//Create new instance
app.post('/', function (req, res) {

    console.log("HTTP Put Request");

    var username = req.body.username;
    var name = req.body.name;
    var contact = req.body.contact;

    var referencePath = '/Users/' + username + '/';
    var userReference = firebase.database().ref(referencePath);
    userReference.set({ name: name, contact: contact },
        function (error) {
            if (error) {
                res.send("Data could not be saved." + error);
            }
            else {
                res.send("Data saved successfully.");
            }
        });
});

//Update existing instance
app.put('/', function (req, res) {

    console.log("HTTP POST Request");

    var username = req.body.name;
    var name = req.body.name;
    var contact = req.body.contat;

    var referencePath = '/Users/' + username + '/';
    var userReference = firebase.database().ref(referencePath);
    userReference.update({ name: name, contact: contact },
        function (error) {
            if (error) {
                res.send("Data could not be updated." + error);
            }
            else {
                res.send("Data updated successfully.");
            }
        });
});

//Delete an instance
app.delete('/', function (req, res) {

    console.log("HTTP DELETE Request");
    //todo
});


//start server on port: 8080
var server = app.listen(8080, function () {

    // var host = server.address().address;
    var port = server.address().port;

    console.log("server listening at http://%s:%s", port);
});