import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing
// Register || Method Post
router.post('/register', registerController);

// Login || Method Post
router.post('/login', loginController);

// Forgot Password || Method Post
router.post('/forgot-password',forgotPasswordController);

//test routes
router.get('/test',requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ ok:true });
});

//protected route Admin
router.get("/admin-auth", requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ ok:true });
});

//update user profile
router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

export default router;