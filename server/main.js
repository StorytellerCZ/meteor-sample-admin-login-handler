import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.registerLoginHandler(function(loginRequest) {
  // There are multiple login handlers in meteor.
  // A login request go through all these handlers to find it's login handler
  // so in our login handler, we only consider login requests which has admin field
  if(!loginRequest.admin) {
    return undefined;
  }

  // Our authentication logic 😉
  if(loginRequest.password !== 'admin-password') {
    return null;
  }

  // We create a admin user if none exists, and get the userId
  let userId = null;
  const user = Meteor.users.findOne({ username: 'admin' }, { fields: { _id: 1 } });
  if(!user) {
    userId = Meteor.users.insert({ username: 'admin' });
  } else {
    userId = user._id;
  }

  // Send logged in user's user id 🎉
  return {
    userId
  }
});
