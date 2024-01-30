import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';

export const createProductController = async (req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size > 100000000:
                return res.status(500).send({error:"Photo is required and should be less than 1MB"});                                    
        }
        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product Created Successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in creating product"
        });
    }
};

//Get all products
export const getProductController = async (req,res) => {
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success:true,
            totalCount: products.length,
            message:"All Products",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting product",
            error: error.message
        });
    }
}

// get single product
export const getSingleProductController = async(req,res) => {
    try{
        const products = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            totalCount: products.length,
            message:"Single Product is here",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting single product",
            error,
        });
    }
}

// get product photo
export const getProductPhotoController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting product photo",
            error,
        });
    }
}

//delete product
export const deleteProductController = async(req,res) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:"Product deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting product",
            error,
        });
    }
}

//update product
export const updateProductController = async(req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"});
            case !description:
                return res.status(500).send({error:"Description is required"});
            case !price:
                return res.status(500).send({error:"Price is required"});
            case !category:
                return res.status(500).send({error:"Category is required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is required"});
            case photo && photo.size > 100000000:
                return res.status(500).send({error:"Photo is required and should be less than 1MB"});                                    
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true}
            )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product updated Successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating product"
        });
    }
}

// Filter Products
export const productFiltersController = async(req,res) => {
    try{
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products,
        })
    } 
    catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in filtering products',
            error
        })
    }
}

// product count
export const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
};

// Search products
export const searchProductController = async (req, res) => {
    try
    {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product API",
          error,
        });
    }
}