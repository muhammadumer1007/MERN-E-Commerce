import Product from "../../models/product-model.js";
import asyncHandler from "express-async-handler";
//@desc Get all Products
//@route GET /api/products
//@access private
const getFilteredProducts = asyncHandler(async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;

                break;
            case "price-hightolow":
                sort.price = -1;

                break;
            case "title-atoz":
                sort.title = 1;

                break;

            case "title-ztoa":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }

        const products = await Product.find(filters).sort(sort);
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

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });


        console.log(product);

        return res.status(200).json({
            success: true,
            status: "Success",
            message: "Product fetched successfully",
            data: product,
        });


    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};


export { getFilteredProducts, getProductDetails }