import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadPetsPics(arrDataURI: string[]) {
  // Upload an arr of images in base 64
  try {
    const uploadArrResult = [];
    for (const dataURI of arrDataURI) {
      const uploadResult = await cloudinary.uploader.upload(dataURI);
      console.log(uploadResult);

      uploadArrResult.push({
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      });
    }

    return uploadArrResult;
  } catch (error) {
    throw error;
  }
}

export async function destroyPetsPics(arrPics: any) {
  // Destroy an arr of images
  try {
    for (const pic of arrPics) {
      await cloudinary.uploader.destroy(pic.public_id);
    }
  } catch (error) {
    throw error;
  }
}

export async function uploadProfilePic(dataURI: string) {
  try {
    const uploadResult = await cloudinary.uploader.upload(dataURI);
    return {
      url: uploadResult.url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    throw error;
  }
}

export async function destroyProfilePic(user: any) {
  // destroy an image
  try {
    await cloudinary.uploader.destroy(user.profilePic.public_id);
  } catch (error) {
    throw error;
  }
}
