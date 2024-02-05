import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, productCountController, productFiltersController, productListController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
//create Products
router.post(
    '/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

//update Products
router.put(
    '/update-product/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get Products
router.get('/get-product', getProductController)

//get single Product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', getProductPhotoController)

//delete photo
router.delete('/delete-product/:pid', requireSignIn,isAdmin,deleteProductController)

//filter products
router.post('/product-filters', productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//search product
router.get("/related-product/:pid/:cid", relatedProductController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;