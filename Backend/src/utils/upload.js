var cloudinary = require('cloudinary').v2;
const fs=require('fs')


cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
});



const uploadoncloudinary=async (localfiles)=>{
    try {
        if(!localfiles) return null
        const response=await cloudinary.uploader.upload(localfiles,{
            resource_type:"auto"
        })
        fs.unlinkSync(localfiles)
        return response
    } catch (error) {
        fs.unlinkSync(localfiles)
        return null
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        return null;
    }
}


module.exports={uploadoncloudinary,deleteFromCloudinary}