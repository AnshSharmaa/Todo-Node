const express = require('express')
const app = express();


app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => { 
    res.send('bruh');
})

app.listen(3000, () => {
    console.log('server 3000');
})
