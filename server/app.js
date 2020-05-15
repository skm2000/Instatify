const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("mongoose is connected!")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting ",err)
})


require('./models/user')
require('./models/post')

app.use(express.json())//express automatically does'nt parses json.
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
//1P1JSw1FX0c6szp6

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running at port "+PORT)
})