const express = require('express')
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./home.html', { root: './public' });
})

app.listen(3000, () => {
    console.log('server 3000');
})
