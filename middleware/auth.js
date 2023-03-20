import jwt from 'jsonwebtoken'
import Admin from '../models/authAdmin.js'
import User from '../models/users.js'

export const adminProtect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer') || req.headers.authorization.startsWith('bearer'))) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Admin.findById(decoded.id).select('-password');
            next(); 
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}

export const userProtect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer') || req.headers.authorization.startsWith('bearer'))) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next(); 
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}

