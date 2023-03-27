const express  = require("express");
const postRouter = express.Router();
const bcrypt = require("bcrypt");
const { PostModel } = require("../models/post.model");


postRouter.get("/",async(req,res)=>{
    try {
        const id = req.body.userID
        const post = await PostModel.find({_id:id});
        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(400).send({"mag":"Error in getting post"})
    }
})

postRouter.post("/add",async(req,res)=>{
    try {
        const data = req.body;
        const post = new PostModel(data);
        await post.save();
    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Error in posting data"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const userID = req.body.userID;
        const id = req.params.id;
        const post = await PostModel.findById(id);
        if(post.userID === userID){
            await PostModel.findByIdAndUpdate(id,req.body);
            res.status(200).send({"msg":"Post has been updated"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("error in updating")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const userID = req.body.userID;
        const id = req.params.id;
        const post = await PostModel.findById(id);
        if(post.userID === userID){
            await PostModel.findByIdAndDelete(id,req.body);
            res.status(200).send({"msg":"Post has been deleted"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("error in deleting post")
    }
})


module.exports = {
    postRouter
}