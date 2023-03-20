import Cart from '../models/cart.js'

export const createCart = async (req, res) => {

    const {userId} = req.body;
    try {
        const newCart = new Cart({items: [], userId});
        await newCart.save();
        res.status(201).json(newCart);    
    } catch (error) {
        res.status(400).json({message: error});
    }
}

export const addCartItem = async (req, res) => {
    const {item, cart} = req.body;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cart.id, {items: [...cart.items, {id: item._id, quantity: item.quantity}]}, { new: true });
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateCartItem = async (req, res) => {
    const {item, cart} = req.body;
    try {
        await Cart.updateOne(
                { _id: cart.id, 'items.id': item._id },
                { $set: { 'items.$.quantity': item.quantity } }
        )
        const updatedCart = await Cart.findById(cart.id)
        res.status(200).json(updatedCart);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const deleteCartItem = async (req, res) => {

    const {cartId} = req.body;
    const {itemId} = req.params;
    console.log(cartId);
    try {
        await Cart.updateOne(
            { _id: cartId },
            { $pull: {
                'items': {
                    'id': itemId
                }
            } }
        )
        const updatedCart = await Cart.findById(cartId)
        console.log(updatedCart);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const fetchCart = async (req, res) => {
    const {userId} = req.params;
    try {
        const fetchedCart = await Cart.findOne({userId});
        res.status(200).json(fetchedCart);
    } catch (error) {
        res.status(400).json({message: error});
    }
}



