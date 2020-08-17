import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const unlockUsersAfterUpdatingCredits =
  functions.firestore.document('usersPrivate/{uid}').onWrite((change, context) => {

    const prevValue: any = change.before.data();
    const newValue: any = change.after.data();

    console.log(prevValue);
    console.log(newValue);

    let credits: number = prevValue.credits;
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
