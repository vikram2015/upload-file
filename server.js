/**
 * Created by vikram on 17/2/18.
 */


var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
var ejs = require("ejs");
var multer = require("multer");
var config = require("./config/config");
// var Skills = require('./server/routes/skillsRoute');

//storage Engine
const storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename:function (req, file, cb) {
        cb(null,file.originalname)
    }
});

//init the upload variable
var upload = multer({
    storage:storage
}).single('myImg');



var app = express();
//app.use(express.static(__dirname + '/public'));
//app.set('views',path.join(__dirname,'/views'));

//app.get()

//code for server start
app.listen(config.port,function (err) {
    if(err){
        console.log("Problem in server startup");
    }else{
        console.log("server connected at port "+ config.port);
    }
});


app.post('/upload',function (req, res) {
    console.log("//////////")
    console.log(req.body)
    console.log(req.file)
//    console.log(req)
    upload(req, res, function (err) {
        console.log("??????????")
        if(err){
            res.render('index',{
                msg:err
            });

        }else
        {
            console.log(req.file)
            res.send('test')
        }
    })
})




//code for middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(bodyparser());
app.use(cors());

//code for routes
// app.use('/skills',Skills);


app.set('view engine', ejs);
app.use(express.static('./public'))
app.get('/',function (req, res) {
    res.render(__dirname + '/public/views/index.ejs');
})



//for DataBase Connectivity
mongoose.connect(config.database);
mongoose.connection.on('connected',function (err) {
    if(err){
        console.log("Error occur"+err);
    }else{
        console.log("connected to port 27017");
    }
})

/*app.use(multer({ path: './uploads/',
 rename: function (fieldname, filename) {
 return filename;
 },
 }));*/


module.exports = app;