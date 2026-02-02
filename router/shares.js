// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/shares', async (req, res) => {
  const db = req.db;
  const sharesCollection = db.collection('shares');
  const shares  = await sharesCollection.find({}).toArray();
  res.send(shares);
});

router.get("/shares/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('shares');
  const shares = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!shares) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(shares);
})

// Add a new shares

router.post('/shares', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('shares');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a shares by ID

router.put('/shares/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('shares');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a shares by ID

router.delete('/shares/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('shares');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
