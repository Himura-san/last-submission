var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKrGTJUnnoPlm8WMaWns7TK61J7HB91j-sAUbIcymdWRFPFxrweFC6XgF2BEh27tZ_UH2HRL3dXDtaLiyZ7sJps",
   "privateKey": "0a61anOSS1d0QJM6JGsiY_UwveJF2JPZgIA2aSFV1SY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dtHmGmTtxTk:APA91bHekCofIxJDOWExxDvGEn8AHzb4kuYGvgzPX085UEs8kkrAMEjBKsqIJDP_VWliHMTBp7oD8-dkJS0cIYb_LkOyc5drwATVlTCBRMlIayJPkMGu6F31dNlx_DzpXX-Orsqzl6Tz",
   "keys": {
       "p256dh": "BNDdOUGAFBvsrrzmLuhTzpmCq+zpMOC47YDYhyOVtmx1dVeCNU0CUHijdXKblfe6qIB6c0kJP2SkqsBEzRHi0Ec=",
       "auth": "//LWizN0CH1xTGfbPoh0ng=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '721751893535',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);