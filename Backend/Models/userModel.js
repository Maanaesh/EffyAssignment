import mongoose from "mongoose";
import validator from "validator";

const {Schema}=mongoose;

const userSchema= new Schema({
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      designation: {
        type: String,
        required: true,
      },
      dob:{
        type:Date,
        required: true,
      },
      active:{
        type:Boolean,
        required: true,
      },
      company: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
},
// {
//     timestamps: true,
//   },
);
userSchema.statics.createUser = async function (newUserObj) {
    const { firstname, lastname, email, designation, dob, active } = newUserObj;
  
    if (!firstname || !lastname || !email || !designation || !dob || !active) {
      throw new Error("All fields are required!");
    }
  
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
  
    const exists = await this.findOne({ email });
    if (exists) {
      throw new Error("Email already in use");
    }
    const user = await this.create({
      firstname,
      lastname,
      email,
      designation,
      dob,
      active,
      
    });
  
    return user;
  };

  const User = mongoose.model('user', userSchema);
  export default User;