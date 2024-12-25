import Order from "../../models/order-model.js";
import Cart from "../../models/cart-model.js";
import Product from "../../models/product-model.js";

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            cartId,
        } = req.body;

        console.log(req.body);


        if (!userId || !cartItems || !addressInfo || !orderStatus || !paymentMethod || !paymentStatus || !totalAmount || !orderDate || !orderUpdateDate || !cartId) {
            return res.json({
                success: false,
                status: "Error",
                message: "All Fields Are Required",
            });
        }


        const newlyCreatedOrder = await Order.create({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            cartId,
        })



        for (let item of newlyCreatedOrder.cartItems) {
            let product = await Product.findById(item.productId)

            if (!product || product?.totalStock - item.quantity < 0) {
                return res.status(404).json({
                    success: false,
                    status: "Error",
                    message: `Not enough stock for this product ${product.title}`,
                });
            }
            product.totalStock -= item.quantity;
            await product.save();
        }

        const getCartId = newlyCreatedOrder.cartId;
        await Cart.findByIdAndDelete(getCartId);


        return res.status(201).json({
            success: true,
            status: "Success",
            message: "Order created successfully",
            data: newlyCreatedOrder,
        });
    }
    catch (err) {
        console.log(err.message);

        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while creating order",
        });

    }
}



const getAllOrdersByUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.json({
                success: false,
                status: "Error",
                message: "No orders found!",

            });
        }


        return res.status(200).json({
            success: true,
            status: "Success",
            message: "Orders fetched successfully",
            data: {
                count: orders.length,
                orders,
            },
        });
    } catch (error) {
        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while fetching orders",
        });

    }
}





const getOrdersDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order)
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });

        return res.status(200).json({
            success: true,
            status: "Success",
            message: "Order fetched successfully",
            data: order,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};


export { createOrder, getAllOrdersByUser, getOrdersDetails }