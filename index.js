const mongoose = require('mongoose')
const express = require('express')
const scissors = require('./models/shortUrls')
const shortUrls = require('./models/shortUrls')
require('dotenv').config()

const app = express()

mongoose.connect('mongodb://localhost/scissors', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Set static folder
// app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shortUrls = await scissors.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await scissors.create({ full: req.body.fullUrl })

    res.redirect('/')
})

const PORT = 4000 || process.env.PORT


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

