import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHY4boUhlb5v0mVN_UDeCZsGBl9Q0rcw4",
    authDomain: "dolphin-web-89727.firebaseapp.com",
    projectId: "dolphin-web-89727",
    storageBucket: "dolphin-web-89727.appspot.com",
    messagingSenderId: "136247876857",
    appId: "1:136247876857:web:45ae6afcb27be31ab15628"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };