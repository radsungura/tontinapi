// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/emexpenses', async (req, res) => {
  const db = req.db;
  const emexpensesCollection = db.collection('emexpenses');
  const emexpenses  = await emexpensesCollection.find({}).toArray();
  res.send(emexpenses);
});

router.get("/emexpenses/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('emexpenses');
  const emexpenses = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!emexpenses) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(emexpenses);
})

// Add a new emexpenses

router.post('/emexpenses', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('emexpenses');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a emexpenses by ID

router.put('/emexpenses/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('emexpenses');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a emexpenses by ID

router.delete('/emexpenses/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('emexpenses');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
