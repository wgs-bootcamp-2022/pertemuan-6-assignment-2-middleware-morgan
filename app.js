const controller = require('./controllers/controller')

const expressLayouts = require('express-ejs-layouts')
const express = require('express');
const app = express();
app.use(expressLayouts)
app.set('layout', './layout/home')
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', controller.getHome);
app.get('/contact', controller.getContact)
app.get('/contact/add',  controller.addContact)
app.post('/contact/add', controller.isValidationAddContact)
app.get('/contact/:id/edit', controller.updateContact)
app.post('/contact/:id/edit', controller.isValidationEditContact)
app.get('/contact/:id/delete', controller.deleteContact)

const port = 3000;
app.listen(port, console.log(`Server has started at port " + ${port}`))
