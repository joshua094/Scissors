import mongoose from 'mongoose'
import express  from 'express'
import ShortUrl from './models/shortUrl.js'
import dotenv from 'dotenv'
import validUrl from 'valid-url'
import shortid from 'shortid'
dotenv.config()

const app = express()

mongoose.connect('mongodb://localhost/shortUrls', {
    useNewUrlParser: true, useUnifiedTopology: true
    
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Set static folder
// app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})



app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})


app.post('/shortUrl', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })

    // const  { fullUrl }  = req.body.fullUrl

    // ///create url code
    // const urlCode = shortid.generate();

    // if (validUrl.isUri(fullUrl)) {
    //     try {
    //         let url = await ShortUrl.findOne({ fullUrl })

    //         if (url) {
    //             res.redirect('/')
    //         }
    //         else {
    //             url = new ShortUrl({
    //                 full,
    //                 short,
    //                 date: new Date()
    //             })
                
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json('Server Error')
    //     }
    // }
    res.redirect('/')
    
})

const PORT = 4000 || process.env.PORT


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

