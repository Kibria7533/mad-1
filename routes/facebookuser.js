const router = require("express").Router();
const User = require("../models/User");
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
var result="";
router.post('/facebook',async  (req, res) => {
    const {accessToken,userId}=req.body;
     let url=`https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`
     fetch(url,{
         method:'GET'
     })
     .then(response => response.json())
     .then(response=>{
        User.findOne({ 'email': response.email }).then(user=> {
          if (!user) {
         const data= new User({
              email: response.email,
              username: response.name,
              confirmed: true
            })
            data.save(function(err,data){
              if(err)
              res.send('cant save');
              if(data){
                const token =  jwt.sign(
                  {
                   
                    role:user,
                    username: data.name,
                    email: data.email
                  },
                  SECRET,
                  { expiresIn: "7 days" }
                );
    
                result = {
                  username: data.name,
                  role: 'user',
                  email: data.email,
                  token: `Bearer ${token}`,
                  expiresIn: 168
                };
                res.json({
                  result
                })
              }
             
            });
             
             
  
          } else {
             
            const token =  jwt.sign(
              {
                user_id: user._id,
                role: user.role,
                username: user.username,
                email: user.email
              },
              SECRET,
              { expiresIn: "7 days" }
            );
  
            result = {
              username: user.username,
              role: user.role,
              email: user.email,
              token: `Bearer ${token}`,
              expiresIn: 168
            };
            res.json({
              result
            })
        }
  
        }).catch(err=>{
          console.log(err);
        })
     }).catch(error=>{
       console.log('lool');
     })
    
  });
  module.exports = router;