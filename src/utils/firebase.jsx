import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axiosInstance from "./axiosInstance";
import { API_URL } from "./Constants";

const firebaseConfig = {
  apiKey: "AIzaSyBJtTlFqSInZ14sSCaPuH8V2HuluBIRkIU",
  authDomain: "mahitala-cb8b6.firebaseapp.com",
  projectId: "mahitala-cb8b6",
  storageBucket: "mahitala-cb8b6.firebasestorage.app",
  messagingSenderId: "139501858476",
  appId: "1:139501858476:web:e0c7771358b4c250083909",
  measurementId: "G-71VGCDW19P",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const requestPermissionAndRegisterToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission not granted.");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const fcmToken = await getToken(messaging, {
      vapidKey:
        "BD46aur8KkhuqCQxmT0Mvp0RtuMUmX1PBhZB8k6yM1pn6_OmA1X9kECzn_f0844dwSKJ2_Ke2uR0H2FP8pDrgAk",
      serviceWorkerRegistration: registration,
    });

    if (fcmToken) {
      const res = await axiosInstance.post(
        API_URL + "/api/notifications/register-token",
        {
          fcmToken: fcmToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return fcmToken;
  } catch (err) {
    console.error("FCM setup error:", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message received: ", payload);
      resolve(payload);
    });
  });
