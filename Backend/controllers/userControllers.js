import validator from "validator";
import User from "../Models/userModel.js";

export const createUser = async (req,res)=>{
    const data= req.body;
    try{
        const newUser= await User.createUser(data);
        res.status(200).json({success:true,message:"User Created"});
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({success:false,message:error.message});
    }
};

export const getUsers = async(req,res)=>{
    try{
    const users= await User.find({});
    res.status(200).json({ success: true, data: users });
    }
    catch (error) {
    console.log("Error in fetching Users", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserById = async(req,res)=>{
    const {id}= req.params;
    //console.log(id);
    try{
        
        if(validator.isMongoId(id)){
            const user=await User.findById(id);
            res.status(200).json({ success: true, data: user });
        }
        else{
            return res.status(404).json({success: false, message: 'Not a valid UserId' });
        }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
      }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body; 
  
    try {
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
      }
  
      if (data.email && !validator.isEmail(data.email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: data }, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


  export const deactivateUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
      }
  
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { active: false } }, 
        { new: true, runValidators: true } 
      );
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User deactivated successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


  export const activateUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
      }
  
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { active: true } }, 
        { new: true, runValidators: true } 
      );
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User activated successfully', data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!validator.isMongoId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
      }

      const deletedUser = await User.findByIdAndDelete(id);
  

      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  

      res.status(200).json({ success: true, message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };