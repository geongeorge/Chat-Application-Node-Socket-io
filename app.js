const express = require('express')
const app = express()
const port = 5000
// var server = require('http').Server(app);
var io = require('socket.io')(3000);

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "lalalala Secret key"}));

//static folder
const staticfolder = express.static(__dirname + '/static')
app.use(staticfolder);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index",{})
})

app.get('/check', function(req, res){
    res.send("You are " + req.sessionID );
 });

 io.on('connection', function (socket) {
    socket.emit('newmsg', { msg: 'Hey' });
    socket.on('newmsg', function (data) {
        console.log(data.msg);
        socket.broadcast.emit('newmsg', { msg: data.msg, uid: data.uid});
      });
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))