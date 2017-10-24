const router = require('express').Router();

const axios = require('axios');
var mongoose = require('mongoose');

const User = require('../models/User');
const Counter = require('../models/Counter');

router.get('/checkUser', function(req, res){
  if(req.user){
    res.json({
      isSignedIn : true,
      location : req.user.location,
      name : req.user.displayName,
      commitments : req.user.commitments
    })
  }else{
    res.json({
      isSignedIn : false
    })
  }
})

router.post('/yelpFusion', function(req, res){
  const config = {
    url : 'https://api.yelp.com/v3/businesses/search',
    params : {
      location : req.body.location,
      categories : 'nightlife'
    },
    headers : {
      Authorization : 'Bearer ' + process.env.YELP_ACCESS_TOKEN
    }
  }
  axios(config)
  .then(yelpRes => {
    //Search to see if we have count data on any of the provided venues
    const venueIds = yelpRes.data.businesses.map(item => item.id);
    Counter.find({
      name : {
        $in : venueIds
      }},
      {_id : false},
      function(err, metadata){
        if (err) throw err;
        res.json({
          yelp : yelpRes.data.businesses, 
          meta : metadata,
          location : req.body.location
        });
      }
    )
  })
  .catch(err => {
    if (err) throw err;
  })
})

router.post('/add', function(req, res){
  User.findOneAndUpdate(
    {'facebookID' : req.user.facebookID},
    {$push : {
      'commitments' : {
        'commitment' : req.body.data.commitment
    }}},
    {new : true},
    function(err, doc){
      if (err) throw err;
      const data = {
        newCommitments : doc.commitments,
        name : req.body.data.commitment
      }
      Counter.findOneAndUpdate(
        {name : req.body.data.commitment},
        {$inc : {
          'count' : 1
        }},
        {upsert : true, new : true},
        function(err, counter){
          if (err) throw err;
          res.json(data);
        }
      )
    }
  )
})

router.post('/remove', function(req, res){
  User.findOneAndUpdate(
    {facebookID : req.user.facebookID},
    {$pull : {
      'commitments' : {
        _id : req.body.data._id
    }}},
    {new : true},
    function(err, doc){
      if (err) throw err;
      const data = {
        newCommitments : doc.commitments,
        name : req.body.data.commitment
      }
      Counter.findOne(
        {name : req.body.data.commitment}, 
        function(err, counter){
          if (err) throw err;
          if(counter.count === 1){
            Counter.remove(
              {_id : counter._id},
              function(err){
                if (err) throw err;
                res.json(data)
              })
          }else{
            Counter.update(
              {_id : counter._id}, 
              {$inc : {
                'count' : -1
              }}, 
              function(err){
                if (err) throw err;
                res.json(data)
              }
            )
          }
      })
    }
  )
})

module.exports = router;