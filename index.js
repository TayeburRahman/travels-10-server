const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome Root Route!!!")
})

const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.PROJECT_USERNAME}:${process.env.PROJECT_USER_PASSWORD}@cluster0.ensig.mongodb.net/${process.env.PROJECT_DATABASENAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    // console.log(err)
    const allTourPackages = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("allTourPackages");
    const allBlogs = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("allBlogs");
    const contactUsMessages = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("contactUsMessages");
    console.log("DataBase Connected")
    const subcribersEmail = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("subcribersEmail");
    const admins = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("admins");
    const bookClientsTours = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("bookClientsTours");
    const upCommingEvent = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("upCommingEvent");
    const messages = client.db(`${process.env.PROJECT_DATABASENAME}`).collection("messages");

    // ADD NEW ADMINS
    app.post('/admins', (req, res) => {
        const data = req.body;
        admins.insertOne(data)
            .then(result => {
                res.json("Successfully Added New Admin Email")
            })
    })
    // GET ALL ADMINS
    app.get('/admins', (req, res) => {
        admins.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // FIND SPECIFIC ADMIN EMAIL ID 
    app.delete('/admins/:id', (req, res) => {
        const id = req.params.id
        admins.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.json("Delete Email Successfully")
            })
    })
    // ADD NEW TOUR PACKAGE PLAN
    app.post('/allTourPackages', (req, res) => {
        const data = req.body;
        console.log(data);
        allTourPackages.insertMany(data)
            .then(result => {
                res.json("Successfully Added New Tour")
                console.log("Server : Successfully Added New Tour");
            })
            .catch(err => {
                console.log("Error Are :", err);
            })
    })
    // GET ALL PACKAGES PLAN
    app.get('/allTourPackages', (req, res) => {
        allTourPackages.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    // GET SINGLE PACKAGE PLAN
    app.get('/singleTourPackage/:id', (req, res) => {
        const id = req.params.id;
        allTourPackages.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
    // DELETE TOUR PACKAGE PLAN
    app.delete('/deleteSingleTourPackage/:id', (req, res) => {
        const id = req.params.id
        allTourPackages.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.json("Deleted Tour Package Successfully")
            })
    })
    // POST BLOG POST 
    app.post('/addBlogs', (req, res) => {
        const data = req.body;
        allBlogs.insertOne(data)
            .then(result => {
                res.json("Successfully Added New Post")
                console.log("Server : Successfully Added New Post");
            })
            .catch(err => {
                console.log("Error Are :", err)
            })
    })
    // GET ALL BLOGS 
    app.get('/addBlogs', (req, res) => {
        allBlogs.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // FIND SPECIFIC BLOG POST
    app.get('/singleBlog/:id', (req, res) => {
        const id = req.params.id
        // console.log(id);
        allBlogs.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
    // DELETE SPECIFIC BLOG POST
    app.delete('/deleteSingleBlog/:id', (req, res) => {
        const id = req.params.id
        allBlogs.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.json("Deleted Blog Post")
            })
    })
    // POST CONTACT US MESSAGE
    app.post('/contactUsMessage', (req, res) => {
        const data = req.body;
        contactUsMessages.insertOne(data)
            .then(result => {
                res.json("Successfully Sent Message")
            })
            .catch(err => {
                console.log("Error Are :", err)
            })
    })
    // GET ALL CONTACT US MESSAGE
    app.get('/contactUsMessage', (req, res) => {
        const data = req.body;
        contactUsMessages.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // POST SUBCRIBERS EMAILS
    app.post('/subcribers', (req, res) => {
        const data = req.body;
        subcribersEmail.insertOne(data)
            .then(result => {
                res.json("Successfully Subcribed")
            })
    })
    // GET ALL SUBCRIBERS EMAILS
    app.get('/subcribers', (req, res) => {
        subcribersEmail.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // BOOK CLIENT TOUR ORDERS
    app.post('/bookTour', (req, res) => {
        const data = req.body;
        bookClientsTours.insertOne(data)
            .then(result => {
                res.json("Successfully Order Placed")
            })
            .catch(err => {
                console.log("Error Are :", err)
            })
    })
    // GET ALL BOOKING PLAN FROM CLIENT
    app.get('/bookTour', (req, res) => {
        bookClientsTours.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // DASHBOARD PAGE -: GET INDIVIDUAL CLIEN TOUR ORDER
    app.get('/individualBookTour', (req, res) => {
        const searchEmail = req.query.email
        // console.log(searchEmail)
        bookClientsTours.find({ logInEmail: searchEmail })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // DASHBOARD PAGE -: GET BOOKED SINGLE TOUR
    app.get('/individualBookTour/:id', (req, res) => {
        const id = req.params.id
        bookClientsTours.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
    // POST UPCOMMING EVENT
    app.post('/upcommingevent', (req, res) => {
        const data = req.body;
        upCommingEvent.insertOne(data)
            .then(result => {
                res.json("Successfully Added New Upcomming Event")
            })
    })
    // GET ALL UPCOMMING EVENT
    app.get('/upcommingevent', (req, res) => {
        upCommingEvent.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    // GET SINGLE EVENT
    app.get('/upcommingevent/:id', (req, res) => {
        const id = req.params.id
        upCommingEvent.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
    // SINGLE EVENT DELETE
    app.delete('/upcommingevent/:id', (req, res) => {
        const id = req.params.id
        upCommingEvent.deleteOne({ _id: ObjectId(id) })
            .then(result => {
                res.json("Successfully Delete Event")
            })
    })
    // POST GET IN TOUCH MESSAGE
    app.post('/touchInTouchMessage', (req, res) => {
        const data = req.body;
        messages.insertOne(data)
            .then(result => {
                res.json("Successfully Sent Message")
            })
    })
    app.get('/touchInTouchMessage', (req, res) => {
        messages.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get('/viewMessage/:id', (req, res) => {
        const id = req.params.id
        // console.log(id)
        contactUsMessages.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
    app.get('/touchViewMessage/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        messages.find({ _id: ObjectId(id) })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Port is running on ${PORT}`)
})