const controller = require('./controllers/controller')
const expressLayouts = require('express-ejs-layouts')
const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');

app.use(expressLayouts)
app.use(express.urlencoded({ extended: true })); // Untuk parsing body request

app.set('layout', './layout/home')

app.set('view engine', 'ejs');

// app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))

app.get('/', controller.getHome);
app.get('/about', controller.getAbout)
app.get('/contact', controller.getContact)
app.get('/contact/add', controller.addContact)
app.post('/contact/add', controller.addPostContact)
app.get('/contact/:id/detail', controller.getDetailContact)
app.get('/contact/:id/edit', controller.updateContact)
app.post('/contact/:id/edit', controller.editPostContact)
app.get('/contact/:id/delete', controller.deleteContact)

const port = 3000;
app.listen(port, console.log(`Server has started at port ${port}`))
