// const express = require("express")
// const accountRoutes = express.Router();
// const fs = require('fs');
// const dataPath = './data/account.json' // path to our JSON file
// const expressLayouts = require('express-ejs-layouts')



// const getAccountData = () => {
//     const jsonData = fs.readFileSync(dataPath)
//     return JSON.parse(jsonData)   
// }

// const saveAccountData = (data) => {
//     const stringifyData = JSON.stringify(data)
//     fs.writeFileSync(dataPath, stringifyData)
// }


// const app = express()

// app.use(expressLayouts)
// app.set('view engine', 'ejs')

// app.use(express.json())
// app.use(express.urlencoded({ extended: true}))

// app.use('/',accountRoutes)

// app.get('/', (req,res)=>{
//     res.render('index',{
//         name : "Yahya",
//         // title: "web yahya",
//         layout:'layout/home'

//     })
// })


// accountRoutes.get('/all', (req, res) => {
//     const accounts = getAccountData()
//     res.send(accounts)
// })

// accountRoutes.post('/account/add', (req, res)=>{
//     const accounts = getAccountData()
//     const userData = req.body
//     accounts.push(userData)

//     saveAccountData(accounts)
//     res.send({success: true, msg: 'account added successfully'})
// })

// accountRoutes.delete('/account/delete/:id', (req,res) => {
//     const id = req.params.id
//     const accounts = getAccountData()
//     const filter = accounts.filter(user => user.id != id);
//     saveAccountData(filter)
//     res.send({success: true, msg: 'User removed successfully'})
// })

// accountRoutes.patch('/account/edit/:id', (req,res)=>{
//     const id = req.params.id
//     const userData = req.body
//     console.log(userData)

//     const accounts = getAccountData()

//     const updateAccount = accounts.filter( user => user.id === id )
//     updateAccount.push(userData)
//     saveAccountData(updateAccount)
    
//     res.send({success: true, msg: 'User data updated successfully'})
// })

// app.listen(3000, ()=> {
//     console.log('listening port 3000')
// })
// const Controller = require('./controllers/controller')
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
app.get('/contact/add', controller.addContact)
app.post('/contact/add', controller.addPostContact)
app.get('/contact/:id/edit', controller.updateContact)
app.post('/contact/:id/edit', controller.updatePostContact)
app.get('/contact/:id/delete', controller.deleteContact)

const port = 3000;
app.listen(port, console.log("Server has started at port " + port))
