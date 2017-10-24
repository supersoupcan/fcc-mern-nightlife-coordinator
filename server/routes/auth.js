module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  
  router.get('/facebook/login/:location/:commitment', function(req, res, next){
    req.session.data = {
      location : req.params.location,
      commitment : req.params.commitment
    };
    req.session.save(next);
  }, passport.authenticate('facebook'))
  
  
  router.get('/facebook/cb', 
    passport.authenticate('facebook', { failureRedirect: '/'}),
    function(req, res){
      res.redirect('/')
    }
  )
  
  router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function(err){
      if (err) throw err;
      res.redirect('/');
    })
  })
  
  return router; 
}