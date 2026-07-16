// 遅延通知の受信用 Service Worker（viewer.html から明示登録される）
// 通知ペイロード付きメッセージはブラウザが自動表示するため、ここでは初期化のみ行う
importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBDbScn1FCiedXrE3BoORjw1KRPP6Rbw9s",
    authDomain: "realtimebus-e46a1.firebaseapp.com",
    databaseURL: "https://realtimebus-e46a1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtimebus-e46a1",
    storageBucket: "realtimebus-e46a1.firebasestorage.app",
    messagingSenderId: "508497237681",
    appId: "1:508497237681:web:a9d898ca4ac098f1133490"
});

const messaging = firebase.messaging();

// データのみのメッセージが来た場合の保険（通常は notification ペイロードで自動表示）
messaging.onBackgroundMessage((payload) => {
    if (payload.notification) return; // 自動表示に任せる
    const title = (payload.data && payload.data.title) || 'バスからのお知らせ';
    const body = (payload.data && payload.data.body) || '';
    self.registration.showNotification(title, { body: body, icon: '../logo.png' });
});
