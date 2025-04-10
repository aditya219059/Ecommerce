import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//Create Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = await new categoryModel({name, slug: slugify(name)}).save();
    res.status(201).send({
        success: true,
        message: "New Category Successfully Created",
        category
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in created category",
    });
  }
};

//Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Category"
    })
  }
}

//get all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      error,
      message: 'Error in Getting all category'
    })
  }
}

//Get single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({slug: req.params.slug});
    res.status(200).send({
      success: true,
      message: "single Category",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      error,
      message: 'Error in Getting single category'
    })
  }
}

//Delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const {id} = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: `Category '${category.name}' deleted successfully`
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      error,
      message: 'Error in Deleting category'
    })
  }
}