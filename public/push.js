var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJnvyM8fEtZf9W0MNTb2ITH2f3z8efFruG4vUyYt0WWZGJyoXDETJE4ACe0E7Iu8RCNNaS25zxC8aU3l_MllAUQ",
   "privateKey": "3lDTFjRIWBEiHGOkqBuwifMkUHVx6Z9WTPeB8RNAK6g"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dYGSgD5KB4A:APA91bEjuZ32Y0zMk-DKCran9H3hMq41sj9yyqMNH6dgCOGk2rRJS2zSlmPOMBN45E_jKimAttX5Ln4eEenNYiZ_mMYlliX7lyNqj23zkrJmHxnRVS25h0EgaEY2j9P78U9wojxSV0N0",
   "keys": {
       "p256dh": "BJ4XHlX+S5yyLujneXWXMmyaac4m8UIqwT0incbx+MM+pNvtVCl/RdStaR3WtoCI7hclEUa5C1OowraDCjmhGYE=",
       "auth": "triEEhSMjXL8eOK/wuEPPg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '477091825532',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);