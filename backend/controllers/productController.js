const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeaures = require("../utils/apifeatures");

//create Product --Admin
exports.createProduct = catchAsyncErrors(async(req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    })
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res) =>{
    
    const resultPerPage = 3;
    const productCount = await Product.countDocument();
    const apiFeature = new ApiFeaures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products
    })
})

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async(req, res , next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true, useFindAndModify: false});

    res.status(200).json({
        success:true,
        product
    })
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async(req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Delete Successfully",
        product
    })

})

// Get Product Details

exports.getProductDetails = catchAsyncErrors(async(req, res, next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }


    res.status(200).json({
        success:true,
        product,
        productCount
    })

});