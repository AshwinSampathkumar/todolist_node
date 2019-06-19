var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.use(session({secret: 'todotopsecret'}))

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
app.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
})
app.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})


app.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


app.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(3000);   
console.log('Listening to port 3000');