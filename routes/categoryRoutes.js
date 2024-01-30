import express from 'express';
import { isAdmin,requireSignIn } from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//Routes
//Create Category
router.post(
    '/create-category',
    requireSignIn,
    isAdmin,
    createCategoryController
);

//Update Category
router.put(
    '/update-category/:id',
    requireSignIn,
    isAdmin,
    updateCategoryController
);

//get All category
router.get('/get-category', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete(
    '/delete-category/:id',
    requireSignIn,
    isAdmin,
    deleteCategoryController
)

export default router;