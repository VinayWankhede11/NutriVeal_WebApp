const path = require('path')
const express = require('express')
const hbs = require('hbs')
const image = require('./image.js')

const app = express()
const port = process.env.PORT || 3000

const dirViews = path.join(__dirname,'../template/views')
const dirPublic = path.join(__dirname,'../public')

//setup handlebars
app.set('views', dirViews)
app.set('view engine', 'hbs')

app.use(express.static(dirPublic))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/scan',(req,res)=>{
    if(!req.query.address)
        return res.send('Please provide image!!!')
    image.scan("sed",(error,response)=>{
        if(error)
            return res.send({error})
        return res.send(response)
    })
})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen(port,(error)=>{
    if(error)
        console.log(error)
    else
        console.log('Server is up on port '+port)
})
