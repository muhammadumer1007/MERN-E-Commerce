import Order from "../../models/order-model.js";

const getAllOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find();

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

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order)
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });

        await Order.findByIdAndUpdate(id, { orderStatus });



        return res.status(200).json({
            success: true,
            status: "Success",
            message: "Order status is updated successfully!",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};


export { getAllOrdersByUser, getOrdersDetails, updateOrderStatus }