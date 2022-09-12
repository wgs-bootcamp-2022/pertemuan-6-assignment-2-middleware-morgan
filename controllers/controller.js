let ejs = require("ejs")
const fs = require('fs')
const dataPath = './data/account.json' // path to our JSON file
const validator = require('validator')

const getHome = (req,res) => {
    res.render('index')

}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}


const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getContact = (req, res) => {
    const jsonData = fs.readFileSync(dataPath)
    const data = JSON.parse(jsonData)   
    res.render('contact', {data})
}

const addContact = (req, res) => {

    res.render('add')
}

const addPostContact = (req, res) => {
    // let  msg = {}
    let id = Math.floor(Math.random() * 100);
    for(i=0; i<dataPath.length;i++){
        dataPath[i].id = id 
    }
    const accounts = getAccountData()
    let objparam = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    }
    const valNumber = validator.isMobilePhone(objparam.number,'id-ID')
    let msg = []
    if(valNumber==false){
        msg.push(console.log("ok"))
    }
    console.log(msg)
    accounts.push(objparam)
    saveAccountData(accounts)
    res.redirect('/contact')
}

const updateContact = (req, res) => {
    const accounts = getAccountData()
    const id = +req.params.id
    const data = accounts.filter( user => user.id === id )
    res.render('editContact',{data})
}

const updatePostContact = (req, res) => {
    const id = +req.params.id
    const accounts = getAccountData()
    let objparam = {
        id: ids,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
      }
    const updateAccount = accounts.filter( contact => contact.id === id )
    updateAccount.push(objparam)
    saveAccountData(updateAccount)
    res.redirect('/contact')
}

const deleteContact = (req, res) => {
    const id = +req.params.id
    const accounts = getAccountData()
    const filter = accounts.filter(user => user.id != id);
    saveAccountData(filter)

    res.redirect('/contact')

}
module.exports = { getHome, getContact, addContact, 
                    addPostContact, deleteContact, 
                    updateContact, updatePostContact
                 }