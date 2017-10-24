const User = require('../models/User');
const FacebookStrategy = require('passport-facebook');

module.exports = function configurePassport (passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/facebook/cb',
    passReqToCallback: true
  },
    function(req, token, tokenSecret, profile, done){
      User.findOne({facebookID : profile.id}, function(err, user){
        if (err){
          return done(err);
        } else if (user){
          return done(null, user);
        } else {
          var newUser = new User();
         
          newUser.facebookID = profile.id
          newUser.token = token;
          newUser.displayName = profile.displayName;
          newUser.location = req.session.data.location;
          newUser.save(function(err){
            if (err) throw err;
            return done(null, newUser);
          })
        }
      })
  }));
  
  return passport;
}