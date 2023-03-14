import Item from '../models/items.js'
import mongoose from 'mongoose';
import fs from 'fs'

export const createItem = async (req, res) => {
    const {title, price, description, category} = req.body;
    const {filename} = req.file;

    console.log(filename);

    const newItem = new Item({title, price, description, category, img: filename})

    try {
        await newItem.save();
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const updateItem = async (req, res) => {
    const {title, price, description, category} = req.body;
    const {id} = await req.params;
    const {filename} = req.file;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No item with that ID!");

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { title, price, description, category, img: filename, _id: id }, { new: true })
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const deleteItem = async (req, res) => {
    const {id} = await req.params;
    const {img} = await req.query;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No item with that ID!");
    try {
        await Item.findByIdAndRemove(id);
        removeImgFile(img);
        res.json({message: 'Item removed successfully'});
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const deleteImg = (req, res) => {
    const {img} = req.params;
    removeImgFile(img);
}

export const fetchItemsByCategory = async (req, res) => {

    const {category} = await req.params;
    console.log("SERVER");
    console.log(category);
    try {
        const items = await Item.find({category});
        res.json({ data: items });    
    } catch (error) {
        res.status(409).json({mesage: error});
    }
}

export const fetchAll = async (req, res) => {
    
    try {
        const items = await Item.find({});
        res.json({data: items})
    } catch (error) {
        console.log(error);
    }
}

export const fetchItemsById = async (req, res) => {
    const {id} = req.params;

    try {
        const items = await Item.findById(id);
        res.json({data: items})
    } catch (error) {
        console.log(error);
    }
}

const removeImgFile = async (img) => {
    try {
        fs.unlink(`../server/uploads/${img}`, err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
    }
}