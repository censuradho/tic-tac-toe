import { firebaseConfig } from "config/firebase";

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

export { app }