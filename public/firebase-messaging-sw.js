// Import and configure the Firebase SDK
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");
import dotenv from 'dotenv';
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  projectId: process.env.FIRE_PROJECT_ID,
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_APP_ID,
  measurementId: process.env.FIRE_MEASUREMENT_ID
};

// Initialize Firebase in the service worker
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.log('Firebase app already initialized or error:', err);
}

// Retrieve an instance of Firebase Messaging
let messaging = null;
try {
  if (firebase.messaging && firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
} catch (err) {
  console.warn('FCM messaging not supported:', err);
}

// Handle background messages
if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    console.log("Received background message:", payload);
    
    const notificationTitle = payload.notification?.title || "LabourBaba";
    const notificationOptions = {
      body: payload.notification?.body || "You have a new update",
      icon: "/Logo.svg",
      badge: "/Logo.svg",
      vibrate: [100, 50, 100],
      data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();
  
  // Open the app
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('Firebase messaging service worker loaded');
