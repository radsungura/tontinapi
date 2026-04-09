// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/places', async (req, res) => {
  const db = req.db;
  const placesCollection = db.collection('places');
  const places  = await placesCollection.find({}).toArray();
  res.send(places);
});

router.get("/places/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('places');
  const places = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!places) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(places);
})

// Add a new places

router.post('/places', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('places');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a places by ID

router.put('/places/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('places');
  const result = await collection.updateOne({ _id: new ObjectId(req.params.id) },{ $set: req.body });
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a places by ID

router.delete('/places/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('places');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
