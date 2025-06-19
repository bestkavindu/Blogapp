const Post = require("../models/postModel")
const User = require("../models/userModel")
const HttpError = require("../models/errorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs =  require('fs')
const path =  require('path')
const {v4: uuid} =  require('uuid')

const createPost = async (req, res, next) => {
    try{
        let {title, category,desc} = req.body
        if(!title || !category || !desc || !req.files ){
            return next(new HttpError("Please fill the all the fields",422))
        }

        const {img} = req.files

        if (img.size > 2000000){
            return next(new HttpError("Image is to big please upload less than 2mb",422))
        }

        let fileName = img.name;
        let categorySlug = category.replace(/ /g,"-").toLowerCase()
        let splitedFileName = fileName.split('.')
        let newFileName = splitedFileName[0] + uuid() + '.' + splitedFileName[splitedFileName.length - 1]
        img.mv(path.join(__dirname, '..', '/uploads', newFileName), async(error)=>{
            if(error){
                return next(new HttpError(error))
            } else{
                const newPost = await Post.create({title, category,categorySlug,desc,img:newFileName,creator:req.user.id})
                if(!newPost){
                    return next(new HttpError('Post could not created',422))
                }
                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser.posts + 1
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.status(201).json(newPost)
            }
        })


    }catch(error){
        return next(new HttpError(error))
    }
}

const getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find().sort({updatedAt:-1})
        res.status(200).json(posts)

    }catch(error){
        return next(new HttpError(error))
    }
}

const getFeaturedPost = async(req, res, next) =>{
    try {

        const post = await Post.findOne().sort({updatedAt:-1})
        res.status(200).json(post)
        
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getSinglePost = async (req, res, next) => {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if(!postId){
        return next(new HttpError("post not found",404))
    }
    res.status(200).json(post)
}

const getCatPost = async (req, res, next) => {
    try {
        const {category} = req.params
        let categorySlug = category.replace(/ /g,"-")
        const post = await Post.find({categorySlug}).sort({createdAt: -1})
        console.log(categorySlug)
        console.log(post)
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUserPost = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await Post.find({creator:id}).sort({createdAt: -1})
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const editPost = async (req, res, next) => {
    try {
        let fileName
        let newFileName
        let updatedPost
        const postId = req.params.id


        let{title, category, desc} = req.body
        
        if(!title || !category || desc.length < 12){
            return next(new HttpError("fill all the fields",422))
        }

        if(!req.files){
            console.log(title)
            updatedPost =await Post.findByIdAndUpdate(postId, {title, category, desc}, {new:true})
            if(!updatedPost){
                return next(new HttpError('post did not update'))
            }
            res.status(200).json(updatedPost)
        }
        else{
            const post = await Post.findById(postId)
            fs.unlink(path.join(__dirname, '..', 'uploads', post.img), async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
            const {img} = req.files
            if (img.size > 2000000){
                return next(new HttpError("Image is to big please upload less than 2mb",422))
            }
            
            fileName = img.name
            let splitFileName = fileName.split('.')
            let newFileName = splitFileName[0] + uuid() + '.' + splitFileName[splitFileName.length - 1]
            img.mv(path.join(__dirname, '..', 'uploads', newFileName), async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category,desc, img:newFileName}, {new:true})
            if(!updatedPost){
                return next(new HttpError('post did not update'))
            }
            res.status(200).json(updatedPost)

        }
    } catch (error) {
        return next(new HttpError(error))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
    if(!postId){
        return next(new HttpError('Post not found', 400))
    }

    const post = await Post.findById(postId)
    const fileName = post?.img;
    if(req.user.id == post.creator){
        fs.unlink(path.join(__dirname, '..', '/uploads', fileName), async(err)=>{
            if(err){
                return next(new HttpError(err))
            }
            else{
                await Post.findByIdAndDelete(postId)
                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts:userPostCount})
            }
            res.status(200).json(`post ${postId} deleted success`)
        })
    }
    else{
        return next(new HttpError('can not delete otthers posts'))
    }
    } catch (error) {
        return next(new HttpError(error))
    }

}

module.exports = {createPost, getPosts, getFeaturedPost, getSinglePost, getCatPost, getUserPost, editPost, deletePost}