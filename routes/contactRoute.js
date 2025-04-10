import express from "express";
import { contactController } from "../controllers/contactController.js";

const router = express.Router();

//Contact route
router.post("/create-contact", contactController);

export default router;