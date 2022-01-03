const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError")

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product })


})


//get products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(201).json({ success: true, products })
})


//update products

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(201).json({ success: true, product })
})

//delete product

exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({ success: true, message: "product deleted successfully" })
})

//get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(201).json({ success: true, product })

})
