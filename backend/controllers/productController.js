const { findOne } = require("../models/productModel");
const Product = require("../models/productModel");

//create product
exports.createProduct = async (req,res,next)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json({success:true,product})
    }
    catch(err){
        console.log("error in creating product",err);
    }
     
}

//get products

exports.getAllProducts = async (req,res)=>{

    const products = await Product.find();

    res.status(201).json({success:true,products})
}

//update products

exports.updateProducts = async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({success:false,message:"product not found"})
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.status(201).json({success:true,product})
}

//delete product

exports.deleteProducts = async (req,res,next)=>{

    let product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return res.status(500).json({success:false,message:"product not found"})
    }

    res.status(201).json({success:true,message:"product deleted successfully"})
}

//get product details

exports.getProductDetails = async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({success:false,message:"product not found"})
    }
    
    res.status(201).json({success:true,product})
}