const Category = require("../models/categoryModel");
const { convertToSlug } = require("../helpers/common");
const { sendSuccessResponse } = require("../helpers/responseHelper");
const addCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const slug = await convertToSlug(name);
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

const getCategory = async (req,res)=>{
  try{
     const allCategory = await Category.find({});
     sendSuccessResponse(res, allCategory, "Category added successfully");
  }catch(error){ 
    res
    .status(500)
    .json({ message: "An error occurred while getting the category" });
  }
}
module.exports = { addCategory,getCategory };
