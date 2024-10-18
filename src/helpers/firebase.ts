import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://rfidweb-cebca-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "rfidweb-cebca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};
