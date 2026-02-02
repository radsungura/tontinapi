// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/groups', async (req, res) => {
  const db = req.db;
  const clientsCollection = db.collection('groups');
  const result = await clientsCollection.find({}).toArray();
  res.send(result);
});

router.get("/groups/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('groups');
  const groups = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!groups) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(groups);
})

// Add a new clients

router.post('/groups', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('groups');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a clients by ID

router.put('/groups/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('groups');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a clients by ID

router.delete('/groups/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('groups');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
