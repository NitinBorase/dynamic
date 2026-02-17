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
const Admin = require('./models/Admin');
const Feature = require('./models/Features');

app.get('/api/hero',  async(req,res) => {
    const hero = await Hero.findOne();
    res.json(hero);
})

app.post('/api/hero', async(req,res) => {
    try{
        let hero = await Hero.findOne();
        if(hero){
            hero.title = req.body.title;
            hero.subtitle_one = req.body.subtitle_one;
            hero.subtitle_two = req.body.subtitle_two;
            await hero.save();
            res.status(200).json({message: "Hero Section Updated Successfully"});
        }
        else{
            hero = new Hero(req.body);
            await hero.save();
            res.status(201).json({message: "Hero Section Created Successfully"});
        }
    }catch(err){
        res.status(500).json({error: "Failed to Save"});
    }
});

app.get('/api/connect',  async(req,res) => {
    const connect = await Connect.findOne();
    res.json(connect);
})

app.post('/api/connect', async(req,res) => {
    try{
        let connect = await Connect.findOne();
        if(connect){
            connect.email = req.body.email; 
            connect.phone = req.body.phone;
            connect.address = req.body.address;
            connect.website = req.body.website;
            await connect.save();
            res.status(200).json({message: "Connect Section Updated Successfully"});
        }
        else{
            connect = new Connect(req.body);
            await connect.save();
            res.status(201).json({message: "Connect Section Created Successfully"});
        }
    }catch(err){
        res.status(500).json({error: "Failed to Save"});
    }
});

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

app.post('/api/admin/login', async(req,res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if(admin){
        res.json({message: "Login Successful"});
    } else {
        res.status(401).json({error: "Invalid Credentials"});
    }   
});

app.get('/api/features', async(req,res)  => {
    try{
        const features = await Feature.find().sort({featureNo: 1});
        res.json(features);
        res.status(200);
    }
    catch(err){
        console.error("FEATURE API ERROR:", err);
        res.status(500).json({error: "Failed to Fetch Features"});
    }
});

app.post('/api/features',async(req,res) => {
    try{
        const feature = new Feature(req.body);
        await feature.save();
        res.status(201).json({message: "Feature Added Successfully"});
    }
    catch(err){
        res.status(500).json({error: "Failed to Add Feature"});
    }
});

app.delete('/api/features/:id', async(req,res) => {
    try{
        const {id} = req.params;
        await Feature.findByIdAndDelete(id);
        res.status(200).json({message: "Feature Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({error: "Failed to Delete Feature"});
    }
});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})