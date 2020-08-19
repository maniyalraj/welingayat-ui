import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

var instance = new Razorpay({
  key_id: 'rzp_test_tm8X6QFyi0Jh4L',
  key_secret: '3bElPUm9kfXjIpGXk7vfFDaJ'
})

app.post('/', (req: any, res: any) => {
  console.log(req);
  res.send('ok');
});

app.post('/generateOrder', (req: any, res: any) => {
  const body = req.body
  const {amount} = body;

  var options = {
    amount: amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: '0'
  };
  instance.orders.create(options, function(err:any, order:any) {
    console.log(order);
    res.send({"orderId":order.id});
  });

});

// Expose Express API as a single Cloud Function:
exports.payments = functions.https.onRequest(app);

export const unlockUsersAfterUpdatingCredits =
  functions.firestore.document('usersPrivate/{uid}').onWrite((change, context) => {

    const prevValue: any = change.before.data();
    const newValue: any = change.after.data();

    console.log(prevValue);
    console.log(newValue);

    let credits: number = prevValue.credits || 0;
    const prevUnlockedUsers: string[] = prevValue.unlockedUsers || [];
    const newUnlockedUsers: string[] = newValue.unlockedUsers || [];

    if (
      prevUnlockedUsers.length !== newUnlockedUsers.length
      || !(newUnlockedUsers.every(val => prevUnlockedUsers.includes(val)))) {

      if (credits >= 100) {
        console.log("Updating Credits");
        credits = (credits - 100)
        newValue.credits = credits;
        return db.doc(`usersPrivate/${prevValue.uid}`).set(newValue, { merge: true });
      }
      else {
        console.log("Insufficient credits");
        return null;
      }

    }
    console.log("Updating without check");
    return true;


  })

export const incrementCountOfUsers =
  functions.firestore.document('users/{uid}').onCreate((snapshot, context) => {

    const increment = firestore.FieldValue.increment(1);

    const chainCounterRef = db.doc('publicData/1');
    chainCounterRef.update({ count: increment });

    return true;

  })
