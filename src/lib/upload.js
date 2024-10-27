import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file)=>{
    const date = new Date() /* to resolve the conflict between the image file name and the user */

    const storageRef = ref(storage, `images/${date + file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

return new Promise((resolve,reject)=>{


uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    reject("Something went wrong!" + error.code)
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
    });
  }
);
});
};

export default upload