import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyAdrs: {
        type: String,
        required: true,
    },
    latLong: {
        type: {
            lat: { type: Number, required: true },
            long: { type: Number, required: true },
        },
        required: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
companySchema.statics.createCompany=async function (newCompanyObj) {
    const{companyName,companyAdrs,latLong}=newCompanyObj;
    if(!companyName||!companyAdrs,!latLong){
        throw new Error("All fields are required!");
    }
    const existingCompany = await this.findOne({ companyName });
    if (existingCompany) {
        throw new Error("Company already exists!");
    }
    const company = await this.create({
        companyName,
        companyAdrs,
        latLong,
    });
    return company;
}


const Company = mongoose.model('Company', companySchema);

export default Company;
