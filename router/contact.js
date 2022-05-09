import express from "express";
import Contact from "../models/Contact.js";


const router=express.Router();

//**************************************** *//

// create => POST ()
// 0Route Add Contact
// 0 Method POST
// àdata : req.body
// pATH : HTTP:/localhost:5000/api/contact
router.post("/post",async (req,res)=>{
    try {
        // before we save the contact we should check if the users dont exist in the DB
        const findUser = await Contact.findOne({email:req.body.email})
        if (findUser) {
            return res.status(400).send({ msg:"email should be unique"})
        }
        // new contact 
        // save it in database
        const newContact= new Contact({...req.body});
        await newContact.save();
        //send success
        res.send({msg:"add route", newContact});
    } catch (error) {
        res.status(400).send({msg:"user not saved", error});
    }
})

// create => GET ()
// 0Route GET All Contact
// @ Method GET
// @data : 
// PATH : HTTP:/localhost:5000/api/contact/

router.get("/contactlist",async (req,res)=>{
    try {
        const contactlist = await Contact.find();
        res.send({contactlist , msg :"get all contact"})
    } catch (error) {
        res.status(400).send({msg:"can not get ", error})
    }

})

// create => GET ()
// 0Route GET by ID
// @ Method GET
// @data : ID req.params
// PATH : HTTP:/localhost:5000/api/contact/contactlist

router.get('/getOne/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const findContact = await Contact.findById(id)
        res.send({msg:"get the contact",findContact})
    } catch (error) {
        res.status(400).send({msg: "can note  get then contact" ,error})
    }
})

// create => DELETE ()
// 0Route DELETE contact
// @ Method DELET
// @data : req.parms
// PATH : HTTP:/localhost:5000/api/contact/delete/:id

router.delete('/delete/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteContact = await Contact.deleteOne({_id: id})
        res.send({msg:"delete scc"})
    } catch (error) {
        res.status(400).send({msg: "can note  delete then contact" ,error})
    }
})

// create => UPDATE ()
// 0Route UPDATE contact
// @ Method UPDATE
// @data : ID req.parms * req.body
// PATH : HTTP:/localhost:5000/api/contact/update/:id

router.put('/update/:id',async(req,res)=>{
    try {
        const {id} = req.params
        await Contact.updateOne({_id:id} , {$set :{...req.body}})
        res.send({msg:"update scc"})
    } catch (error) {
        res.status(400).send({msg: "can note  update then contact" ,error})
    }
})


export default router;