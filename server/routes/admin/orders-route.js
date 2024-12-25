import express from "express";
import { getAllOrdersByUser, getOrdersDetails, updateOrderStatus } from "../../controllers/admin/order-controller.js";

const router = express.Router();

router.get("/list", getAllOrdersByUser);
router.get("/details/:id", getOrdersDetails);
router.put("/update/:id", updateOrderStatus);

export default router;





