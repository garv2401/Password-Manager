const express=require('express');
const cors=require('cors')
const app=express()
const port=3000;
const bodyparser=require('body-parser');
app.use(bodyparser.json())
app.use(cors())
require('dotenv').config()
//console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

const {MongoClient}=require('mongodb');
const url="mongodb://localhost:27017"

const client=new MongoClient(url);

const dbname='PassManager';

client.connect();

app.get('/',async (req,res)=>{
    const db=await client.db(dbname);
    const collection=await db.collection('passwords');
    const findRes=await collection.find({}).toArray();
    res.json(findRes);
})

app.post('/',async (req,res)=>{
    const password=req.body;

    const db=await client.db(dbname);
    const collection=await db.collection('passwords');
    const findRes=await collection.insertOne(password);
    res.send({success:true,result:findRes});

})

app.delete('/',async (req,res)=>{
    const password=req.body;
    const db=await client.db(dbname);
    const collection=await db.collection('passwords');
    const deleted=await collection.deleteOne(password);
    res.send({success:true,Deleted:deleted});

})

app.listen(port,()=>{
    console.log('Listening on port 3000')
})