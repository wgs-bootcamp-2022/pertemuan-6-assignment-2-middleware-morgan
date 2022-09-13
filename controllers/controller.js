let ejs = require("ejs")
const fs = require('fs')
const dataPath = './data/account.json' // path to our JSON file
const { body, validationResult, check } = require('express-validator'); // Express Validator

const getHome = (req,res) => {
    res.render('index')

}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath, 'utf-8')
    console.log(jsonData)
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


const updateContact = (req, res) => {
    const accounts = getAccountData()
    const id = +req.params.id
    const data = accounts.filter( user => user.id === id )
    res.render('editContact',{data})
}

const isDuplicat = (name) => {
    const contacts = getAccountData();
    return contacts.find((contact) => contact.name === name );
}

const isValidationAddContact = [
    [
        body('name').custom(value => {
            const duplicat = isDuplicat(value);
            if(duplicat) {
            throw Error('Contact number is already used');
            }
            return true;
        }),
        check('email', 'Email address is invalid').isEmail(),
        check('number', 'Mobile number is invalid').isMobilePhone('id-ID') 
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('add', {
            errors: errors.array()
            });
        } 
            // code add post contact
            const id = Math.floor(Math.random() * 1000); // membuat id random
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
            const updateAccount = accounts.filter( contact => contact.id !== id )
            updateAccount.push(objparam)
            saveAccountData(updateAccount)
            res.redirect('/contact')
        
    }
]

const isValidationEditContact = [
    [
        body('name').custom((value, {req}) => {
            const duplicat = isDuplicat(value);
            if (value !== req.body.name && duplicat) {
                throw new Error('Your Name is already used');
            }
            return true;
        }),
        check('email', 'Email address is invalid').isEmail(),
        check('number', 'Mobile number is invalid').isMobilePhone('id-ID') 
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('editContact', {
            errors: errors.array()
            });
        } else {
            const id = +req.params.id
            const accounts = getAccountData()
            let objparam = {
                id: id,
                name: req.body.name,
                email: req.body.email,
                number: req.body.number
            }
            const updateAccount = accounts.filter( contact => contact.id !== id )
            updateAccount.push(objparam)
            saveAccountData(updateAccount)
            res.redirect('/contact')
        }
    }
]

const deleteContact = (req, res) => {
    const id = +req.params.id
    const accounts = getAccountData()
    const filter = accounts.filter(user => user.id != id);
    saveAccountData(filter)
    res.redirect('/contact')
}

module.exports = {
                    getHome, 
                    getContact, 
                    addContact,     
                    deleteContact, 
                    updateContact,      
                    isValidationAddContact, 
                    isValidationEditContact
                 }