const express = require('express')
const bodyParser = require('body-parser');
const webpush = require('web-push');

const vapidKeys = {
  "publicKey": "BNODufYXb4mgB0RJSHfgUkvzbHGYoY6B8zKBa3fhPuGMaIv4DMcpHo5FVHGp259dlh4axqB0mYafgG3M5Ql1k7c",
  "privateKey": "BuhEfo2IKwQj3kvdwfaO0oSnKCsKSqtJAxG9w3pEFI4"
};


webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();


app.use(bodyParser.json());

const USER_SUBSCRIPTIONS = [];

app.route('/subscribe').post((req, res) => {
  const sub = req.body;

  console.log('Received Subscription on the server: ', sub);

  USER_SUBSCRIPTIONS.push(sub);

  res.status(200).json({
    message: "Subscription added successfully."
  });
});

app.route('/push').post( async (req, res) => {
  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload = {
    "notification": {
      "title": "Revature",
      "body": "Where quinn doesn't write bugs",
      "icon": "assets/icons/icon-72x72.png",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "explore",
        "title": "Go to the site"
      }]
    }
  };


  Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload))))
    .then(() => res.status(200).json({
      message: 'Newsletter sent successfully.'
    }))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
})


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
