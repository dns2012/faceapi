const express   = require('express');
const app       = express();
const port      = 3000;
app.listen(port);

const morgan    = require('morgan');
const bodyParser = require('body-parser');

const presentController = require('./api/controllers/present');

// CROSS ORIGIN
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json();
    }
    next();
})

// BODY PARSER 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// MORGAN (FOR LOGING)
app.use(morgan('dev'));

// ROUTES
app.use('/present', presentController);

// PUBLIC STATIC DIRECTORY
app.use(express.static('public'))


app.get('/', (req, res, next) => {
    res.send("FACE RECOGNITION RESTFUL API");
})