// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/refunds', async (req, res) => {
  const db = req.db;
  const refundsCollection = db.collection('refunds');
  const refunds  = await refundsCollection.find({}).toArray();
  res.send(refunds);
});

router.get("/refunds/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('refunds');
  const refunds = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!refunds) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(refunds);
})

// Add a new refunds

router.post('/refunds', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('refunds');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a refunds by ID

router.put('/refunds/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('refunds');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a refunds by ID

router.delete('/refunds/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('refunds');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
