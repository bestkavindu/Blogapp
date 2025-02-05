const User = require("../models/userModel")
const HttpError = require("../models/errorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs =  require('fs')
const path =  require('path')
const {v4: uuid} =  require('uuid')



const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new HttpError("Please fill all the fields"))
        }

        const newEmail = email.toLowerCase()

        const user = await User.findOne({ email: newEmail })


        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return next(new HttpError("Password did not match please check", 422))
        }

        const { _id: id, name } = user

        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({ token, id, name })

    } catch (error) {
        return next(new HttpError("Login faild please check credentials", 422))
    }

}

const registerUser = async (req, res, next) => {
    
    try {
        const { name, email, password, password2 } = req.body
        if (!name || !email || !password || !password2) {
            return next(new HttpError("Fill the all the field", 422))

        }

        const newEmail = email.toLowerCase()

        const emailExist = await User.findOne({ email: newEmail })
        if (emailExist) {
            return next(new HttpError("Allready have a account", 422))
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Passowrd should be more than  6 characters", 422))
        }

        if (password != password2) {
            return next(new HttpError("Password not match", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({ name, email: newEmail, password: hashedPass })
        res.status(201).json(newUser)
    } catch {
        return next(new HttpError("userregister faild", 422))
    }
}

const getUser = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await User.findById(id).select('-password')

        if(!user){
            return next(new HttpError("User not found", 404))
        }

        res.status(200).json(user)

    }catch(error){
        return next(new HttpError(error))
    }
}

const chnageAvatar = async (req, res, next) => {
    try{
        console.log(req.files.avatar)
        if(!req.files.avatar){
            return next(new HttpError("Please choose img", 422))
        }

        const user = await User.findById(req.user.id)

        if(user.avatar){
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files

        if(avatar.size > 1000000){
            return next(new HttpError("Profile picture to big", 422))
        }

        let filename;
        filename = avatar.name
        let splitAvatarName = filename.split('.')
        let newFileName = splitAvatarName[0] + uuid() +'.' + splitAvatarName[splitAvatarName.length - 1]
        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err)=>{
            if(err){
                return next(new HttpError(err))
            }
            const updateAvatar = await User.findByIdAndUpdate(req.user.id, {avatar:newFileName}, {new: true})
            if(!updateAvatar){
                return next(new HttpError("Avatar cound be chnaged", 422))
            }
            res.status(200).json(updateAvatar)
        })
    }catch(error){
        return next(new HttpError(error))
    }
}

const editUser = async (req, res, next) => {
    try{
        const {name,email,cuurentPassword, newPassword,NewConfirmPassword} = req.body

        if(!name || !email || !cuurentPassword || !newPassword || !NewConfirmPassword){
            return next(new HttpError("Please fill all the fields", 422))
        }

        const user = await User.findById(req.user.id)
        if(!user){
            return next(new HttpError("Coulnd find user", 422))
        }

        const existEmail = await User.findOne({email})
        if(existEmail && (existEmail._id != req.user.id)){
            return next(new HttpError("Email allready exist", 422))
        }
        const validateUserPassword = await bcrypt.compare(cuurentPassword, user.password)
        if(!validateUserPassword){
            return next(new HttpError("Invalida current password", 422))
        }

        if(newPassword != NewConfirmPassword){
            return next(new HttpError("Password not match", 422))
        }


        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
        res.status(200).json(newInfo)

    } catch(error){
        return next(new HttpError(error))
    }
}

const getAuthors = async (req, res, next) => {
   try{
    const authors = await User.find().select('-password')
    res.status(200).json(authors)

   }catch(error){
    return next(new HttpError(error))
   }
}

module.exports = { loginUser, registerUser, getUser, chnageAvatar, editUser, getAuthors }