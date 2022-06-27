//jshint esversion: 6
//apiKey = "94c112b8fe7629f447f4ac72ab32c99b-us14"
//94c112b8fe7629f447f4ac72ab32c99b-us14
//ListId = 'f6e712723c.'
const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/f6e712723c";
  const options = {
    method: "POST",
    auth: "jalil14:43dd1db2f295c765552d505b018c334c-us14"
  }
  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    } else{
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
  console.log("The app is running on port 3000.")
})
