const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const dbconn = require('./connections/connection.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');

require('./controllers/controller.js')(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
