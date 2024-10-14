import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {email, password, username} = req.body;

    try{
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["The email is already in use"]);

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = User({
            username,
            email,
            password: passwordHash,
        });
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})

        res.cookie('token', token);
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            cratedAt: userSaved.cratedAt,
            updatedAt: userSaved.updatedAt,
        })
    }catch(e){
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{

        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({message: "User not found."});

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({message: "Incorrect Password"})
    
        const token = await createAccessToken({id: userFound._id})

        res.cookie('token', token)
        
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            cratedAt: userFound.cratedAt,
            updatedAt: userFound.updatedAt,
        })
    }catch(e){
        res.status(500).json({message: error.message});
    }
}

export const logout = (req, res) =>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    console.log(req.user.payload.id);
    const userFound = await User.findById(req.user.payload.id);
    if(!userFound) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
    res.send('profile');
};

export const verifyToken = async (req, res) =>{
    const {token} = req.cookies;
    

    if (!token) return res.status(401).json({message: "Unauthorized1"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized2"});

        const userFound = await User.findById(user.payload.id);
        
        if(!userFound) return res.status(401).json({message: "Unauthorized3"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
}

