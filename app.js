const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const storeRouter = require('./routes/stores');
var jwt = require('jsonwebtoken');
const app = express();
const db = require("./db");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.set('sequelize', db)

//connect mongo db
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
// sequlize();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//public routes
app.use('/users', userRouter)

//private routes
app.use('/stores', validateUser, storeRouter)

app.get('/', (req, res) => {
    res.json({ "tutorial": "Build REST API with node.js" });
})

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            // res.json({ status: "500", message: err.message, data: null });
            res.status(401).json({error: new Error(err.message), message: err.message})
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });

}
//404 errror
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//handle common errors

app.use((req, res, next) => {
    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
})

app.listen(3003, () => {
    console.log(`server running http://localhost:3003`);
});