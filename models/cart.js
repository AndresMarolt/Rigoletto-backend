import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    id: {type: String},
    items: {type: Array, required: true}
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;