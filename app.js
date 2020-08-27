const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");
require('dotenv').config();

console.log(process.env)

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  // console.log(email);
const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};
const jsonData=JSON.stringify(data);

const url ="https://us17.api.mailchimp.com/3.0/lists/96c3759852";

const options={
  method:"POST",
  auth:"NIHARIKA:"+process.env.API_KEY
}
const sendDataToMailchimp=https.request(url,options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }
  else{
    res.sendFile(__dirname+"/failure.html")
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
  sendDataToMailchimp.write(jsonData);
  sendDataToMailchimp.end();


});


app.post("/failure",function(req,res){
  res.redirect("/")
})



app.listen(3000,function(){
  console.log("Server is up");
});




// LIST ID
// 96c3759852
