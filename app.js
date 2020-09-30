require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");
// sequelize.sync({force: true})
app.use(express.json());
app.use(require("./middleware/headers"));
let user = require('./controllers/usercontroller')
let plant = require('./controllers/plantcontroller')
let location = require('./controllers/locationcontroller')
sequelize.sync();

// app.use('/test', function(req, res){
//     res.send('test endpoint')
// })
app.use('/user', user);

app.use('/plant', plant);

app.use('/location', location);

app.listen(4000, function(){
    console.log('App is listening on port 4000')
});