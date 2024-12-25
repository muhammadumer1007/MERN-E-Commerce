import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/product-model.js";
import asyncHandler from "express-async-handler";
const handleImageUpload = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        return res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error occured",
        });
    }
};




//@desc Get all Products
//@route GET /api/products
//@access private
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            status: "Success",
            message: "Product fetched successfully",
            data: {
                count: products.length,
                products,
            },
        });
    } catch (error) {
        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while fetching products",
        });

    }
})
//@desc Craete Product
//@route POST /api/products
//@access private
const createProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock, averageReview } = req.body;

        if (!image, !title, !description, !category, !brand, !price, !salePrice, !totalStock) {
            return res.json({
                success: false,
                status: "Error",
                message: "All Fields Are Required",
            });
        }
        const newlyCreatedProduct = await Product.create({

            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview
        });

        return res.status(201).json({
            success: true,
            status: "Success",
            message: "Product created successfully",
            data: newlyCreatedProduct,
        });
    } catch (error) {
        console.log(error.message);

        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while creating product",
        });
    }

};

//@desc Update Product by id
//@route PUT /api/products/:id
//@access private
const editProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.json({
                success: false,
                status: "Error",
                message: "Product not found",
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                image: req.body.image || product.image,
                title: req.body.title || product.title,
                description: req.body.description || product.description,
                category: req.body.category || product.category,
                brand: req.body.brand || product.brand,
                salePrice: req.body.salePrice || product.salePrice,
                totalStock: req.body.totalStock || product.totalStock,
                averageReview: product.averageReview

            }
        )
        return res.json({
            success: true,
            status: "Success",
            message: "Product updated successfully",
        });
    } catch (err) {
        return res.json({
            success: false,
            status: "Error",
            message: "Some error occurred while updating the product",
        });

    }
})

//@desc Delete Product by id
//@route DELETE /api/products/:id
//@access private
const deleteProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.json({
                success: false,
                status: "Error",
                message: "Product not found",
            });
        }

        await Product.deleteOne({ _id: req.params.id });

        return res.json({
            success: true,
            status: "Success",
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.json({
            success: false,
            status: "Error",
            message: "Something error occurred while deleting the product",
        });

    }
})



export { handleImageUpload, getAllProducts, createProduct, editProductById, deleteProductById }