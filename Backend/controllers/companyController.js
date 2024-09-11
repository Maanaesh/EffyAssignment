import Company from "../Models/companyModel.js";
import User from "../Models/userModel.js";
import validator from "validator";

export const createCompany = async(req,res)=>{
    const data= req.body;
    try{
        const newCompany= await Company.createCompany(data);
        res.status(200).json({success:true,message:"Company Created"});
    }
    catch(error){
        res.status(400).json({success:false,message:error.message});
    }
};
export const getCompanies = async(req,res)=>{
    try{
    const companies= await Company.find({});
    res.status(200).json({ success: true, data: companies });
    }
    catch (error) {
    console.log("Error in fetching Companies", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyById = async(req,res)=>{
    const {id}= req.params;
    //console.log(id);
    try{
        
        if(validator.isMongoId(id)){
            const company=await Company.findById(id);
            res.status(200).json({ success: true, data: company });
        }
        else{
            return res.status(404).json({success: false, message: 'Not a valid CompanyId' });
        }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
      }
};

export const updateCompany = async (req, res) => {
    const { id } = req.params;
    const data = req.body; 
  
    try {
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Company ID' });
      }
  
      const updatedCompany = await Company.findByIdAndUpdate(
        id,
        { $set: data }, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedCompany) {
        return res.status(404).json({ success: false, message: 'Company not found' });
      }
  
      res.status(200).json({ success: true, message: 'Company Details updated successfully', data: updatedCompany });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export const deleteCompany = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Company ID' });
      }

      const deletedUser = await Company.findByIdAndDelete(id);
  

      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'Company not found' });
      }
  

      res.status(200).json({ success: true, message: 'Company deleted successfully', data: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export const addUser = async(req,res)=>{
    const {companyId,userId}=req.params;
    try{
        if(!validator.isMongoId(companyId)||!validator.isMongoId(userId)){
            return res.status(400).json({ success: false, message: 'Invalid IDs' });
        }
        const company = await Company.findById(companyId);
        const user = await User.findById(userId);
        if (!company || !user) {
            return res.status(404).json({ success: false, message: 'Company or User not found' });
        }
        company.users.push(userId);
        await company.save();
        user.company = companyId;
        await user.save();
        res.status(200).json({ success: true, message: 'User added to company successfully', data: company });
    }
    catch(error){
        
        res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const removeUser = async (req, res) => {
    const { companyId, userId } = req.params;

    try {

        if (!validator.isMongoId(companyId) || !validator.isMongoId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid IDs' });
        }


        const company = await Company.findById(companyId);
        const user = await User.findById(userId);

        if (!company || !user) {
            return res.status(404).json({ success: false, message: 'Company or User not found' });
        }


        company.users.pull(userId);
        await company.save();

        user.company = null;
        await user.save();

        res.status(200).json({ success: true, message: 'User removed from company successfully', data: company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};