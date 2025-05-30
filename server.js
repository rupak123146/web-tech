const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Person = require('./models/person');

const app = express();

// ✅ MongoDB connection (clean version)
mongoose.connect('mongodb://localhost:27017/personalinfo')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  const people = await Person.find();
  res.render('index', { people });
});

app.post('/add', async (req, res) => {
  const { name, email, age } = req.body;
  await Person.create({ name, email, age });
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('edit', { person });
});

app.post('/update/:id', async (req, res) => {
  const { name, email, age } = req.body;
  await Person.findByIdAndUpdate(req.params.id, { name, email, age });
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
