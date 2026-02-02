// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/fines', async (req, res) => {
  const db = req.db;
  const finesCollection = db.collection('fines');
  const fines  = await finesCollection.find({}).toArray();
  res.send(fines);
});

router.get("/fines/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('fines');
  const fines = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!fines) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(fines);
})

// Add a new fines

router.post('/fines', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('fines');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a fines by ID

router.put('/fines/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('fines');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a fines by ID

router.delete('/fines/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('fines');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
