const express = require("express");
const seed = require("./models/seed.js");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const app = express();
const { findOneAndUpdate } = require('./models/seed');
require('dotenv').config();
const path = require('path');
const DATABASE_URL = "mongodb+srv://cvhs0sand:mongodb@cluster0.eob6a6s.mongodb.net/mongodb03312023?retryWrites=true&w=majority"

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride("_method"))


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


//INDUCES


//I is for index
app.get("/seed/", (req, res) => {
  res.render("index.ejs", { allSeed: seed })
})
// I is for INDEX
// app.get('/seed', async(req, res) => {
//     const allSeed = await seed.find({}).exec()
//     res.render('new.ejs')
// })

//N is for New
app.get("/seed/new", (req, res) => {
  res.render("new.ejs")
})


//D is for delete
app.delete("/seed/:indexOfSeedArray", (req, res) => {
  seed.splice(req.params.indexOfSeedArray, 1)
  res.redirect("/seed") 
})
// D is for DELETE
// app.delete('/seed/:id', async (req, res) => {
// 	const newSeed = await seed.find({}).exec()
// 	newSeed.splice(req.params.id, 1)
// 	console.log(newSeed);
// 	res.redirect("/seed")
// })



//U is for update
app.put("/seed/:indexOfSeedArray", (req, res) => {
  seed[req.params.indexOfSeedArray] = req.body
res.redirect("/seed") 
})
// Update
// app.put('/seed/:id', async (req, res) => {
//   const updatedSeed = await seed.findById({_id: req.params.id})
//   if (req.body) {
//     updatedSeed.body = req.body
//   }
//   await updatedSeed.save().then(res.redirect('/seed'))
// })



//C is for Create
app.post("/seed", (req, res) => {
  seed.push(req.body)
res.redirect('/seed')
})
// Create
// app.post('/seed', (req, res) => {
// 	const createdSeed = new seed(req.body)
//     createdSeed.save().then(res.redirect('/seed'))
// });



//E is for edit
app.get("/seed/:indexOfSeedArray/edit", (req, res) => {
  res.render(
    "edit.ejs", 
    {
      seed: seed[req.params.indexOfSeedArray],
      index: req.params.indexOfSeedArray, 
    }
  )
  res.redirect("/seed")
})

//E is for edit
// app.get("/seed/:id/edit", async (req, res) => {
//   res.render(
//     "edit.ejs", 
//     {
//       seed: seed[req.params.id],
//       index: req.params.id, 
//     }
//   )
// })





//S is for show 
    app.get("/seed/:indexOfSeedArray", (req, res) => {
        res.render("show.ejs", {seed: seed[req.params.indexOfSeedArray]})
      })

// Show
// app.get('/seed/:id',  async(req, res) => {
//     const specifiedSeed = await seed.findById(req.params.id).exec()
//     res.render(show.ejs, {
//       seed: specifiedSeed
//     })
// });



//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));