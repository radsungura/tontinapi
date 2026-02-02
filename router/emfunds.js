// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/emfunds', async (req, res) => {
  const db = req.db;
  const emfundsCollection = db.collection('emfunds');
  const emfunds  = await emfundsCollection.find({}).toArray();
  res.send(emfunds);
});

router.get("/emfunds/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('emfunds');
  const emfunds = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!emfunds) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(emfunds);
})

// Add a new emfunds

router.post('/emfunds', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('emfunds');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a emfunds by ID

router.put('/emfunds/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('emfunds');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a emfunds by ID

router.delete('/emfunds/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('emfunds');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
