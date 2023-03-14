import Admin from '../models/authAdmin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400).json({message: "Please fill all fields"});
    }
    
    try {
        const adminExists = await Admin.findOne({email});
        console.log("ADMIN EXISTS?");
        console.log(adminExists);
    
        if(adminExists) res.status(400).json({message: "User already exists!"});
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("ACA");
        const admin = await Admin.create({
            name, email, password: hashedPassword
        })

        console.log(admin);
        if(admin) {
            res.status(201).json({
                _id: admin.id,
                name: admin.name,
                email: admin.email,
                token: generateToken(admin._id)
            })
        } else {
            res.status(400);
        }
        
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const loginAdmin = async (req, res) => {
    console.log("LLEGA A SERVER");
    const {email, password} = req.body;

    try {
        const admin = await Admin.findOne({email});
    
        if(admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                // _id: admin.id,
                // name: admin.name,
                // email: admin.email,
                token: generateToken(admin._id)
            })
        } else {
            res.status(400).json({message: "Invalid credentials"});
        }
    } catch (error) {
        res.status(400).json({message: error});
    }
}


// ----------------------------------------------------------------------------
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}