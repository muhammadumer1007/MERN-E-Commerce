import express from "express";
import { createOrder, getAllOrdersByUser, getOrdersDetails } from "../../controllers/shop/order-controller.js";

const router = express.Router();


router.post("/create", createOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrdersDetails);

export default router;





