import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

export async function uploadProfilePic(dataURI: string) {
  // Upload the profile picture to the cloud
  // Return the URL of the uploaded image
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(dataURI);
    return uploadResult;
  } catch (error) {
    throw error;
  }
}

export async function destroyProfilePic(asset_id: string) {
  // Upload the profile picture to the cloud
  // Return the URL of the uploaded image
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.destroy(asset_id);
    return uploadResult;
  } catch (error) {
    throw error;
  }
}
