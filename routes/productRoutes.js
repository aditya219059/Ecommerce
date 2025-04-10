import express from "express";
import formidable from "express-formidable";
import {
  braintreePaymentController,
  braintreeTokenController,
  categoryProductController,
  createProductController,
  deleteProductController,
  productController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  searchProductController,
  similarProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Router
//Create Product
router.post("/create-product", requireSign, isAdmin, formidable(), createProductController);

//Update Product
router.put(
  "/update-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  updateProductController
);

//Get all product
router.get("/get-product", productController);

//Get single product
router.get("/single-product/:slug", singleProductController);

//Product photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete(
  "/delete-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  deleteProductController
);

//Product filter 
router.post("/product-filter", productFilterController);

//Product Count
router.get("/product-count", productCountController);

//Prduct List
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchProductController);

//Similar product
router.get("/similar-product/:pid/:cid", similarProductController);

//Category Product 
router.get("/category-product/:slug", categoryProductController);

//Payment Routes
//Token
router.get("/braintree/token", braintreeTokenController);

//Payment
router.post("/braintree/payment", requireSign, braintreePaymentController);

export default router;
