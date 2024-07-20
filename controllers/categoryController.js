const Category = require('../models/categoryModel')
const {convertToSlug} = require('../helpers/common')
const {sendSuccessResponse} = require('../helpers/responseHelper');
const addCategory = async (req,res)=>{
  const { name, description, image } = req.body;
  const slug = await convertToSlug(name);
  const newCategory = await Category.create({ name, description,slug, image });
  sendSuccessResponse(res,newCategory,'Category added successfully');
}
module.exports = {addCategory}