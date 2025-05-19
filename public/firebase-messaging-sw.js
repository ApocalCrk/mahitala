importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBJtTlFqSInZ14sSCaPuH8V2HuluBIRkIU",
  authDomain: "mahitala-cb8b6.firebaseapp.com",
  projectId: "mahitala-cb8b6",
  storageBucket: "mahitala-cb8b6.firebasestorage.app",
  messagingSenderId: "139501858476",
  appId: "1:139501858476:web:e0c7771358b4c250083909",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  const notificationOptions = {
    body: body
  };

  self.registration.showNotification(title, notificationOptions);
});
