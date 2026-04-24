const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully! ✅"))
  .catch(err => console.log("Connection Error: ❌", err));
  // Job Model ko yahan import kijiye
const Job = require('./models/Job');

// ------------------------------------
// 1. Nayi Job Post karne ka rasta (POST API)
// ------------------------------------
app.post('/api/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body); // Frontend se aaya data pakdo
    const savedJob = await newJob.save(); // Database mein save karo
    res.status(201).json(savedJob); // Success message wapas bhejo
  } catch (error) {
    res.status(500).json({ message: "Job save karne mein error aaya!" });
  }
});

// ------------------------------------
// 2. Saari Jobs dekhne ka rasta (GET API)
// ------------------------------------
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Database se saari jobs nikalo
    res.status(200).json(jobs); // Frontend ko bhej do
  } catch (error) {
    res.status(500).json({ message: "Jobs laane mein error aaya!" });
  }
});

// 3. Job Delete karne ka rasta (DELETE API)
app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job Deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Delete karne mein error!" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
