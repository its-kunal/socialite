import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAFTjfz0YWcP8vZ_9R9O-VJir1AH9SiPYs",
    authDomain: "imagess-2630.firebaseapp.com",
    projectId: "imagess-2630",
    storageBucket: "imagess-2630.appspot.com",
    messagingSenderId: "7379738260",
    appId: "1:7379738260:web:f90a0d23182306b0ec5e81"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)