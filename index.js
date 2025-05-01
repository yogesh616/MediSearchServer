require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const NodeCache = require('node-cache');
const Medical = require('./Model/model');
const ReviewQuestion = require('./Model/reviewModel'); // New Model for review questions
const compression = require('compression');
const helmet = require('helmet');




const app = express();
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache with 10-minute TTL
app.use(compression());
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ URL Middleware for logging and performance tracking
app.use((req, res, next) => {
  
  res.setHeader('Cache-Control', 'public, max-age=600'); // Browser caching for 10 mins
  next();
});

// API to Get 10 Medical Questions Per Page with Caching

app.get('/medical-questions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // ✅ Enforce maximum limit of 50
    if (limit > 50) limit = 50;

    const cacheKey = `medical_questions_${page}_${limit}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

    const questions = await Medical.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    cache.set(cacheKey, questions, 600); // Cache for 10 minutes
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ API to Get Suggestions Based on Query with Caching
app.get('/suggestion', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const cacheKey = `suggestion_${query}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

   // const suggestions = await Medical.find({input: { $regex: query, $options: 'i' }}).limit(10).lean();

    const suggestions = await Medical.find({ $text: { $search: query } }).select('input').limit(10).lean();

    
    
    
   // cache.set(cacheKey, suggestions, 600);
   cache.set(cacheKey, JSON.stringify(suggestions.map(s => s.input)), 600);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// ✅ API to Get Answer Based on Query with Caching
app.get('/answer', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json({ message: 'No query provided.' });

  const cacheKey = `answer_${query}`;
  let answer = cache.get(cacheKey);
  if (answer) return res.json({ answer });

  const result = await Medical.findOne({ input: query }).select('output').lean();
  if (!result) return res.json({ message: 'No answer found.' });

  cache.set(cacheKey, result.output, 600);
  res.json({ answer: result.output });
});


// ✅ API to Submit Question for Review (Optimized Query Handling)
app.post('/submit-question', async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) return res.status(400).json({ message: 'Question is required.' });

    // Single query to check if question exists in Medical or ReviewQuestion collections
    const existingEntry = await Medical.findOne({ input }) || await ReviewQuestion.findOne({ input });
    if (existingEntry) {
      return res.status(409).json({ message: 'Question already exists in the database or is pending review.' });
    }

    const newQuestion = new ReviewQuestion({ input });
    await newQuestion.save();
    res.status(201).json({ message: 'Question submitted for review.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Start Server
app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});