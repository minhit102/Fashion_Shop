const Cart = require('../models/cart');
const Product = require('../models/products');

exports.getCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await Cart.findOne({ user_id: user._id }).populate('cartItems.product_id')
        if (!cart || cart.cartItems.length === 0) {
            return res.status(200).json({
                status: 0,
                message: "Nothing in cart"
            });
        }
        let totalPrice = 0;
        cart.cartItems.forEach(cartItem => {
            const product = Product.findById(cartItem.product_id);
            if (!product) {
                return res.status(404).json({
                    status: 0,
                    message: "Product does not exist"
                })
            }
            totalPrice += product.price * cartItem.quantity;
            if (product.countInStock < cartItem.quantity) {
                cartItem.status = false;
            }
        });

        res.status(200).json({
            status: 1,
            message: "Get Cart success",
            totalPrice: totalPrice,
            cartItems: cart.cartItems
        })
    }
    catch (error) {
        res.status(500).json({
            status: 0,
            message: "Get Cart fail"
        })

    }
}

exports.addItem = async (req, res) => {
    try {
        const user = req.user;
        let cart = await Cart.findOne({ user_id: user._id })
        if (!cart) {
            cart = await Cart.create({ user_id: user._id })
        }
        const { productItems } = req.body;
        const product = await Product.findById(productItems.product_id)
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product does not exist"
            })
        }
        const listItem = cart.cartItems || [];
        const item = listItem.find(pve => pve.product_id == productItems.product_id)
        if (item) {

            if ((item.quantity + productItems.quantity) > product.countInStock) {
                return res.status(400).json({
                    status: 0,
                    message: "Not enough stock available for the product."
                });
            }
            else {
                listItem.map(pre => {
                    if (pre.product_id == productItems.product_id) {
                        pre.quantity += productItems.quantity;
                    }
                })

                const cartUpdate = await Cart.findByIdAndUpdate(cart._id, {
                    cartItems: listItem
                })
            }
        }
        else {
            if (productItems.quantity > product.countInStock) {
                return res.status(400).json({
                    status: 0,
                    message: "Not enough stock available for the product."
                });
            }
            else {
                listItem.push({
                    product_id: productItems.product_id, // productId là id của sản phẩm
                    quantity: productItems.quantity,
                    status: true
                });
                const cartUpdate = await Cart.findByIdAndUpdate(cart._id, {
                    cartItems: listItem
                })
            }
        }

        res.status(200).json({
            status: 1,
            message: "add productIteam success",
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            error: error
        })

    }
}

