const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//kích hoạt middleware để xử lý dữ liệu được gửi đến server qua phương thức POST
app.use(
    express.urlencoded({
        extended: true,
    }),
);

//Sử dụng middleware để xử lý dữ liệu JSON
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP logger
// app.use(morgan('combined')) //dùng để hiện thị request mỗi lần load service

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebar.js'),
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));
//chỉ tới thư mục views
console.log(path.join(__dirname, 'resources/views'));

route(app);
// app.get('/home', (req, res) => {
//     res.render('home');
//   })

// app.get('/search', (req, res) => {
//   console.log(req.query.q);
//   res.render('search');
// })

// app.post('/search', (req, res) => {
//   console.log(req.body.q);
//   res.send('');
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
