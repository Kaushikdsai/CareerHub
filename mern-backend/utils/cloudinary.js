const { v2: cloudinary }=require('cloudinary');
const { CloudinaryStorage }=require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary,
    params: async(req,file) => {
        let folderName='careerhub_uploads';
        if(file.fieldname==='jdFile'){
            folderName='careerhub_jds';
        }
        if(file.fieldname==='resume'){
            folderName='careerhub_resumes';
        }
        return {
            folder: folderName,
            allowed_formats: ['pdf','docx','jpg', 'jpeg', 'png' ]
        };
    }
});

module.exports={ cloudinary,storage };