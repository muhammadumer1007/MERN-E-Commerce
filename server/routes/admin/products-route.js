import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import { createProduct, deleteProductById, editProductById, getAllProducts, handleImageUpload } from "../../controllers/admin/products-controller.js";

const router = express.Router();

router.post("/upload-image", upload.single('file'), handleImageUpload);
router.route("/get").get(getAllProducts);
router.route("/add").post(createProduct);
router.route("/delete/:id").delete(deleteProductById);
router.route("/edit/:id").put(editProductById);


export default router;





