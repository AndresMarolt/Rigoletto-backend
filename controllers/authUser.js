import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from './../models/users.js'

export const createUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password) return res.status(400).json({message: "Please fill all fields"});

        const userExists = await User.findOne({email});
    
        if(userExists) return res.status(400).json({message: "User already exists!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username, email, password: hashedPassword
        })
        
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
        
    } catch (error) {
        res.status(400).json({message: error});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
    
        if(user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({message: "Invalid credentials"});
        }
    } catch (error) {
        res.status(400).json({message: error});
    }
}

export const getUser = async (req, res) => {
    const { _id, username, email, cart } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        username,
        email,
        cart
    })
}

// ----------------------------------------------------------------------------
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}