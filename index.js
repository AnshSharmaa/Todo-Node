const express = require('express')
const app = express();

const MongoClient = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./home.html', { root: './public' });
})

app.post('/addpost', (req, res) => {
    var todo = {
        name: req.body.name,
        deadline: req.body.time,
    }

    MongoClient.connect(url, (err,client)=>{
        if(err)throw err;
        db = client.db('demo');
        db.collection('todo').insertOne(todo, (err, res) => {
            if (err) throw err;
            console.log(todo);
            client.close();
        })
    })

    res.sendFile('./home.html', { root: './public' });
})

app.post('/update', (req, res) => {
    var old = {
        name: req.body.oname,
    }
    var todo = {
        name: req.body.name,
        deadline: req.body.time,
    }
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        db = client.db('demo');
        db.collection('todo').update(old, todo, (err, res) => {
            if (err) throw err;
            client.close();
        })
    })
    res.sendFile('./home.html', { root: './public' });
});

app.post('/delete', (req, res) => {
    var old = {
        name: req.body.oname,
    }
    MongoClient.connect(url, (err, client) => {

        if (err) throw err;
        db = client.db('demo');
        db.collection('todo').deleteOne(old, (err, res) => {
            if (err) throw err;
            client.close();
        })
    })
    res.sendFile('./home.html', { root: './public' });
});

app.get('/todos', (req,res)=>{
    MongoClient.connect(url, (err,client)=>{
        if (err) throw err
        db = client.db('demo');
        db.collection('todo').find({}).toArray((err,result)=>{
            if (err) throw err;
            res.send(result);
        })
    })
})

app.listen(3000, () => {
    console.log('server 3000');
})
