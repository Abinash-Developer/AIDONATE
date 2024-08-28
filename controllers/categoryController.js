const Category = require("../models/categoryModel");
const { convertToSlug } = require("../helpers/common");
const { sendSuccessResponse } = require("../helpers/responseHelper");

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = await convertToSlug(name);
    const image = req.file.filename;
    const newCategory = await Category.create({
      name,
      description,
      slug,
      image,
    });
    sendSuccessResponse(res, newCategory, "Category added successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the category" });
  }
};

const getCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    sendSuccessResponse(res, allCategory, "Category added successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the category" });
  }
};

//Admin dashboard code for category

const fetchCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("admin/category/category", {
      categories,
      currentRoute: "category",
    });
  } catch (error) {
    res.render("admin/category/category", {
      errorMessage: "An error occurred while getting the category",
    });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const particularCategory = await Category.findOne({ _id: req.params.id });
    res.render("admin/category/singleCategory", {
      particularCategory,
      currentRoute: "category",
    });
  } catch (error) {
    res.render("admin/category/singleCategory", {
      errorMessage: "An error occurred while getting the category",
    });
  }
};
const getCategoryByIdEdit = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.render("admin/category/editcategory", {
      category,
      currentRoute: "category",
    });
  } catch (error) {
    res.render("admin/category/editcategory", {
      errorMessage: "An error occurred while getting the category",
    });
  }
};
const updateCategory = async (req, res) => {
  const { id, name, description } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Category ID is required",
    });
  }
  let updateData = {
    name,
    description,
  };
  if (req.file) {
    updateData.image = req.file.filename;
  }
  try {
    const updatedCategory = await Category.updateOne(
      { _id: id },
      { $set: updateData }
    );
    if (updatedCategory.acknowledged) {
      res.json({
        status: "success",
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } else {
      res.json({
        status: "error",
        message: "Category not found or no changes made",
      });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update category",
    });
  }
};
module.exports = {
  addCategory,
  getCategory,
  fetchCategory,
  getCategoryById,
  getCategoryByIdEdit,
  updateCategory,
};
