const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/account").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 db_connect
   .collection("account")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/account/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("account")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new record.
recordRoutes.route("/account/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   email: req.body.email,
   password: req.body.password
 };
 db_connect.collection("account").insertOne(myobj, function (err, res) {
   if (err) throw err;
   console.log("1 account added");
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
    email: req.body.email,
    password: req.body.password
   }, 
  }
});
 
// This section will help you delete a record
recordRoutes.route(":id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("account").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 account deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;