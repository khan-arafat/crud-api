const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')


const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});
const addContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try {
        const userAvailable = await Contact.findOne({email: req.body.email});
        if(userAvailable){
            res.status(400);
            throw new Error("Email exist");
        }
        const contact = await Contact.create({
            name, email, phone,user_id:req.user.id
        })
        res.status(201).json({contact});
    } catch (error) {
        console.log(error);
        res.status(401)
        throw new Error('Access Denied')
    }
});

const getContact = asyncHandler(async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404)
            throw new Error('Contact not found!'); 
        }
        res.status(200).json([contact])
    } catch (error) {
        res.status(404)
        throw new Error('Contact not found!');
    }
    
});

const updateContact = asyncHandler(async(req, res) => {
    try {
        const contact = await Contact.findById({_id: req.params.id});
        if(contact.user_id.toString()!==req.user.id){
            res.status(401);
            throw new Error("You donot have acesss");
        }
        let updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json([updatedContact]);
    } catch (error) {
        res.status(404)
        throw new Error('Contact not found!');
    }
});

const deleteContact = asyncHandler(async(req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404)
            throw new Error('Contact not found!'); 
        }
        let deletedContact = await Contact.findByIdAndRemove(req.params.id);
        res.status(200).json([deletedContact]);
    } catch (error) {
        res.status(404)
        throw new Error('Contact not found!');
    };
});

module.exports = { getContacts, addContact, getContact, updateContact, deleteContact }