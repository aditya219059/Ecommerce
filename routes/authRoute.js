import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Register router
router.post("/register", registerController);

//Login router
router.post("/login", loginController);

//Forgot password
router.post("/forgot-password", forgotPasswordController);

//Test route
router.get("/test", requireSign, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSign, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSign, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSign, updateProfileController);

//Get order
router.get("/orders", requireSign, getOrderController);

//Get all orders
router.get("/all-orders", requireSign, isAdmin, getAllOrderController);

//Update order status
router.put("/order-status/:orderId", requireSign, isAdmin, orderStatusController);

export default router;
