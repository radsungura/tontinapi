// require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const router = express.Router();

router.get('/users', async (req, res) => {
  const db = req.db;
  const usersCollection = db.collection('Users');
  const users  = await usersCollection.find({}).toArray();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const cow = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!cow) {
      res.status(404).send({ message: "No data match your research" });
    }
     res.status(200).json(cow);
})

// Add a new cow

router.post('/users', async (req, res) => {
  const db = req.db;
  console.log(req);
  const collection = db.collection('Users');
  const result = await collection.insertOne(req.body);
  res.json(result);
});

// Update a cow by ID

router.put('/users/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(200).json(result);
  console.log("set data", req.body);

});

// Delete a cow by ID

router.delete('/users/:id', async (req, res) => {
  const db = req.db;
  const collection = db.collection('Users');
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});
module.exports = router;
