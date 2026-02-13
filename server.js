const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://nitinborase72:1234567890@cluster0.g64ub.mongodb.net/parallaxDB')
.then(()=> console.log("MongoDB Connected"))
.catch(()=> console.log(err));

const Hero = require('./models/Hero');
const Contact = require('./models/Contact');
const Connect  = require('./models/Connect');

app.get('/api/hero',  async(req,res) => {
    const hero = await Hero.findOne();
    res.json(hero);
})

app.get('/api/connect',  async(req,res) => {
    const connect = await Connect.findOne();
    res.json(connect);
})

app.post('/api/contact', async(req,res)=> {
    try{
        const contact = new Contact(req.body);
        await contact.save();
        res.json({message: "Saved Sucessfully"});
    }
    catch{
        res.status(500).json({error: "Failed to Save"});
    }
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})