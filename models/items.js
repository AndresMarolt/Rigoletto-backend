import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    id: {type: String},
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}
})

const Item = mongoose.model("Item", itemSchema);

export default Item;