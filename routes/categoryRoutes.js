import express from "express";
import { isAdmin, requireSign } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//Router
//Create category
router.post("/create-category", requireSign, isAdmin, createCategoryController);

//Update category
router.put(
  "/update-category/:id",
  requireSign,
  isAdmin,
  updateCategoryController
);

//Get all category
router.get("/get-category", categoryController);

//Get single category
router.get('/single-category/:slug', singleCategoryController);

//Delete category
router.delete('/delete-category/:id', requireSign, isAdmin, deleteCategoryController);

export default router;
