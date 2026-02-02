// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/savings', async (req, res) => {
  const db = req.db;
  const savingsCollection = db.collection('savings');
  const savings  = await savingsCollection.find({}).toArray();
  res.send(savings);
});

router.get("/savings/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('savings');
  const savings = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!savings) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(savings);
})

// Add a new savings

router.post('/savings', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('savings');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a savings by ID

router.put('/savings/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('savings');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a savings by ID

router.delete('/savings/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('savings');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
