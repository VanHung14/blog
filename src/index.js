const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const route = require('./routes')
var port = process.env.PORT || 3000;
const db = require('./config/db')
var bodyParser = require('body-parser')

// connect to DB
db.connect()
app.use(express.static(path.join(__dirname, '/public')))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

route(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



// comment code
// app.engine('hbs', handlebars.engine({
//   extname: '.hbs',
//   helpers: {
//     sum: (a, b) => a + b,
// }
// }
// ))
// app.use(express.urlencoded({
//   extended: true
// }))
// // middlewaree processing json
// app.use(express.json())

// app.use(forms.array()); 

// const fileUpload = require('express-fileupload')
// app.use(fileUpload({ createParentPath: true }));

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources','views'));