const User = require('../models/userModel')
const getAllCharity = async (req,res)=>{
    try{
        const ngos = await User.find({role:"ngo"}).populate('state').populate('district');
        res.render('admin/charity',{"ngoresult":ngos});
    }catch(error){
        console.log(error)    
    }
}
const deactivateCharity = async (req,res)=>{
    try{
        await User.updateOne({_id:req.params.id},{$set:{status:'inactive'}});
        res.json({ message: 'Charity deactivated successfully', success: true });
    }catch(error){
       console.log(error);
    }
}
const activateCharity = async (req,res)=>{
    try{
        await User.updateOne({_id:req.params.id},{$set:{status:'active'}});
        res.json({ message: 'Charity deactivated successfully', success: true });
    }catch(error){
       console.log(error);
    }
}
module.exports = {getAllCharity,deactivateCharity,activateCharity}