const express = require('express');
const fs = require('fs');
const router = express.Router();


const  jsonString = fs.readFileSync("./outputfile.json", "utf8");
const json_strfy = JSON.parse(jsonString);
var items = {}
var sendData

router.get('/reports/json', function(req,res){
    var myjsonstr = getFlattenObject(json_strfy);
    var fltdata_two_ary =  Object.entries(myjsonstr)    
    sendData = JSON.stringify(myjsonstr, undefined, 4, true);
    res.header("Content-Type",'application/json');
    //res.render('',{data:sendData});
   res.send(sendData);
 });


router.get('/reports', function(req,res){
    var data = JSON_OBJECT;
    res.render('path-to-view-file', data);
 });

router.get('/address', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Esterling Accime',
        style:  'home.css',
        age: 5,
        isDisplayName: true,
        isAgeEnabled: true,
        people: [
            {firstName: "Yehuda", lastName: "Katz"},
            {firstName: "Carl", lastName: "Lerche"},
            {firstName: "Alan", lastName: "Johnson"}
        ],

        test: '<h3>Welcome to Texas</h3>',
    });
});


router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        style:  'about.css',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, eligendi eius! Qui'
    });
});


router.get('/look', (req, res) => {

    res.render('lookup', {
        user: {
            username: 'accimeesterlin',
            age: 20,
            phone: 4647644
        },
        people: [
            "James",
            "Peter",
            "Sadrack",
            "Morissa"
        ]
    });
});




function processJSON(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      // Object (non-array) processing
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(`${key} : ${obj[key]}`);
          processJSON(obj[key]); // Recursively process the value
       }
     }
  } 
}

function getFlattenObject(data, response = {}) {
    for (const key in data) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        getFlattenObject(data[key], response);
      } else {
        response[key] = data[key];
      }
    }
    return response;
  }



function processJSONObj(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      // Object (non-array) processing
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(`${key} : ${obj[key]}`);
          processJSON(obj[key]); // Recursively process the value
        }
      }
    } else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        console.log(`Index: ${i}`);
        processJSON(obj[i]); // Recursively process array elements
      }
    }
}



module.exports = router;