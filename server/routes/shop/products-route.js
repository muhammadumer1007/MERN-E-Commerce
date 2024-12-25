import express from "express";
import { getFilteredProducts, getProductDetails } from "../../controllers/shop/product-controller.js";

const  router = express.Router();
router.route("/get").get(getFilteredProducts);
router.route("/productDetails/:id").get(getProductDetails);


export default router;
