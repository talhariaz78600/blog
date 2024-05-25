// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref,uploadBytes,getDownloadURL} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAu5RADi2XDiPKR2OR9wX5ogRaKR_OOHTA",
  authDomain: "fooda-5b09c.firebaseapp.com",
  projectId: "fooda-5b09c",
  storageBucket: "fooda-5b09c.appspot.com",
  messagingSenderId: "144697964642",
  appId: "1:144697964642:web:6a47354036f04b18bfb93b",
  measurementId: "G-8TL5T5VNVF"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
const storeimage=(file)=>{

     const storageRef = ref(storage, 'images/food/' + file.name);

    // Upload file to Firebase Storage
      return uploadBytes(storageRef, file)
      .then((snapshot) => {         
        console.log('Uploaded a blob or file:', snapshot);
        // Get download URL for the uploaded file
        return  getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            return downloadURL; // Return the download URL
          });
      })
      
      .catch((error) => {
        console.error('Error uploading file:', error);
        throw error; // Propagate the error to the caller
      });
}

export default storeimage;