// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getCookie } from "../cookie-functions";
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
 
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const messaging = getMessaging(app);

const sendDeviceTokenToServer = (token)=>{
  let accessToken = getCookie('sopp-auth')
  let merchantId = getCookie("userId")
  console.log("Send device token to service")
  axios.post(`http://localhost:8084/notification/token/${token}/user/${merchantId}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  }).then((response)=>{
    console.log(response)
  })
}

export const requestPermission = () => {
  if (getCookie("sopp-auth")!=null && !getCookie("deviceToken")) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification User Permission Granted."); 
        return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
          .then((currentToken) => {
            console.log(currentToken)
            if (currentToken) {
              console.log('Client Token: ', currentToken);
              sendDeviceTokenToServer(currentToken)
            } else {
              
              console.log('Failed to generate the app registration token.');
            }
          })
          .catch((err) => {

            console.log('An error occurred when requesting to receive the token.', err);
          });
      } else {

        console.log("User Permission Denied.");
      }
    });
  }
  

}

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
export default app;