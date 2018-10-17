const express = require('express')
const app = express()
const port = 5000

//static folder
const staticfolder = express.static(__dirname + '/static')
app.use(staticfolder);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index",{})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))