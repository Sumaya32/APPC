var express = require('express');
var app = express();
var ejs = require('ejs');
var port = process.env.PORT || 8080;

var LocalStorage = require('node-localstorage').LocalStorage;
   localStorage = new LocalStorage('./scratch')


app.use(express.static(__dirname));
app.set('view engine', 'ejs', 'html');
app.engine('html', ejs.renderFile);



app.get(`/`, (req, res) => { //had ik al
    res.render('./index.html');
})

let endpoints = ["index", "start", "game", "hulp", "about"]; //had ik al en is nu -hulp
endpoints.forEach(item => {
    app.get(`/${item}.html`, (req, res) => {
        res.render(`./${item}.html`);
    })
});




app.listen(port, () => { console.log('app is running at port' + ' ' + port) });
