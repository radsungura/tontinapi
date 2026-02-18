// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/credits', async (req, res) => {
  const db = req.db;
  const creditsCollection = db.collection('credits');
  const credits  = await creditsCollection.find({}).toArray();
  res.send(credits);
});

router.get("/credits/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('credits');
  const credits = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!credits) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(credits);
})

// Add a new credits

router.post('/credits', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('credits');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a credits by ID

router.put('/credits/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('credits');
  const result = await collection.updateOne({ _id: new ObjectId(req.params.id) },{ $set: req.body });
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a credits by ID

router.delete('/credits/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('credits');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
