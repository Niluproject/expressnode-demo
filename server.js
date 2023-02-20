const express = require('express');
const path = require('path');
const multer = require('multer');
const reqFilter = require('./Middleware/middleware')
//const route = express.Router()

const app = express();
const publicPath = path.join(__dirname, 'public');
console.log(publicPath);

//app.use(reqFilter);
//app.use(express.static(publicPath));
//route.use(reqFilter);

const upload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            cb(null, file.filename + "_" + Date.now() + ".jpg")
        }
    })
}).single("user_file");

app.get('/help', (req, res) => {
    res.sendFile(`${publicPath}/help.html`)
});

app.get('/testpage', (req, res) => {
    res.sendFile(`${publicPath}/testPage.html`)
});

app.get("/", reqFilter, (req, res) => {
    console.log("Data sent by", req.query.name);
    res.send("Hello " + req.query.name);
});

app.get("/about", reqFilter, (req, res) => {
    res.send(`
    <input type="text" placeholder="Enter Name" value="${req.query.name}"/>
    `);
});

app.get("/", (req, res) => {
    console.log("Data sent by", req.query.name);
    res.send("Hello " + req.query.name);
});

app.get("/test", (req, res) => {
    res.send([
        {
            name: 'nilesh',
            email: 'test@gmail.com'
        },
        {
            name: 'nilu',
            email: 'nilu@gmail.com'
        }
    ]);
});

app.get("/contact", (req, res) => {
    res.send("Hello Contact Page");
});

app.post("/upload", upload,(req, res) => {
    res.send("file Uploaded");
})


// route.get("/simple",(req,res)=>{
//     res.send("Hello Simple Page");
// })

app.get('*', (req, res) => {
    res.sendFile(`${publicPath}/notFoundpage.html`)
})

//app.use('/',route);

app.listen(5200);