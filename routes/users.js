const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  writterLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET,PASSWORD } = require("../config");
var nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require('express-validator');

// Users Registeration Route
router.post("/register-user", body('password_confirmation').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password');
  }

  // Indicates the success of this synchronous custom validator
  return true;
}), [

  check('fullname').not().isEmpty().withMessage('Fullname can not be empty').isLength({
    min: 3
  }),
  check('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage("Enter a valid email"),
  check('username').not().isEmpty().withMessage('Username can not be empty').isLength({
    min: 3
  }),
  check('password').not().isEmpty().withMessage('Password should not be empty').isLength({ min: 8 }).withMessage('Password minimum eight characters, at least one letter')

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errorResponse = errors.array({ onlyFirstError: true });
    return res.status(422).json({ message: errorResponse[0] });
  }
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", body('password_confirmation').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password');
  }

  // Indicates the success of this synchronous custom validator
  return true;
}), [

  check('fullname').not().isEmpty().withMessage('Fullname can not be empty').isLength({
    min: 3
  }),
  check('EducationLevel').not().isEmpty().withMessage('Education Level can not be empty').isLength({
    min: 3
  }),
  check('eductioninstitute').not().isEmpty().withMessage('Eduction Institute can not be empty').isLength({
    min: 3
  }),
  check('DepertmentName').not().isEmpty().withMessage('Depertment Name can not be empty').isLength({
    min: 3
  }),
  check('Address').not().isEmpty().withMessage('Address can not be empty').isLength({
    min: 3
  }),
  check('Mobile').not().isEmpty().withMessage('Mobile Number can not be empty').isLength({
    min: 3
  }),
  check('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage("Enter a valid email"),
  check('username').not().isEmpty().withMessage('Adminname can not be empty').isLength({
    min: 3
  }),
  check('password').not().isEmpty().withMessage('Password should not be empty').isLength({ min: 8 }).withMessage('Password minimum eight characters, at least one letter')

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errorResponse = errors.array({ onlyFirstError: true });
    return res.status(422).json({ message: errorResponse[0] });
  }
  await userRegister(req.body, "admin", res);
  
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await writterLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user", "admin", "superadmin"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin", "superadmin"]),
  async (req, res) => {

    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

router.get('/active/:activeToken', function (req, res, next) {

  // find the corresponding user
  User.findOne({
    activeToken: req.params.activeToken,

    // check if the expire time > the current time       activeExpires: {$gt: Date.now()}
  }, function (err, user) {
    if (err) return next(err);

    // invalid activation code
    if (!user) {
      return res.render('message', {
        title: 'fail to activate',
        content: 'Your activation link is invalid, please <a href="/account/signup">register</a> again'
      });
    }
    user.confirmed = true;
    user.save();
    res.redirect(307, `http://localhost:3000`);
  });
});

router.post('/forgotpassordorusername', async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email })
  if (!emailExist) {
    return res.status(404).json({
      message: "Email not found. Invalid login credentials.",
      success: false
    });
  }

  let forgetpasswordToken = jwt.sign(
    {
      email: req.body.email
    },
    SECRET,
    { expiresIn: "1 days" }
  );
  try {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tenminuteversity@gmail.com',
        pass: PASSWORD
      }
    });

    var link = `http://localhost:3000/forgotpassword/${forgetpasswordToken}`;
    let username = emailExist.username;
    var mailOptions = {
      from: 'tenminuteversity@gmail.com',
      to: req.body.email,
      subject: 'Welcome',
      html: `<h1>Your user name is: ${username} </h1>
    </br>
    Please  <a href="${link}">click here </a> to reset your password.`
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        await emailExist.updateOne({ activeToken: forgetpasswordToken });
        console.log(emailExist.activeToken);
        res.send(emailExist);
      }
    });
  } catch (error) {

  }

});
router.post('/forgotpassword/forms/:forgotpasswordtoken', body('password_confirm').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password');
  }
  return true;
}), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errorResponse = errors.array({ onlyFirstError: true });
    res.status(422).json({ message: errorResponse[0] });
  }
  User.findOne({
    activeToken: req.params.forgotpasswordtoken,

    // check if the expire time > the current time       activeExpires: {$gt: Date.now()}
  }, async function (err, user) {
    if (err) return next(err);

    // invalid activation code
    if (!user) {
      return res.render('message', {
        title: 'fail to activate',
        content: 'Your activation link is invalid, please <a href="/account/signup">register</a> again'
      });
    }

    const password = await bcrypt.hash(req.body.password, 12);
    user.password = password;
    user.confirmed = true;
    await user.save();
  });
})
router.get('/getalluser',async(req,res)=>{
  const users=await User.find({});
  res.send(users);
})
router.get('/getallwritter',async(req,res)=>{
  const users=await User.find({"writterconfirmed":true});
  res.send(users);
})
router.get('/getallwritteraplicant',async(req,res)=>{
  const users=await User.find({"writterconfirmed":false});
  res.send(users);
})
router.post('/deleteuser',async(req,res)=>{
  const users=await User.deleteOne({_id:req.body.id});
  res.send(users);
})

router.post('/deletewritterapplicant',async(req,res)=>{
  const users=await User.deleteOne({_id:req.body.id});
  res.send(users);
})
router.post('/deletewritter',async(req,res)=>{
  const users=await User.deleteOne({_id:req.body.id});
  res.send(users);
})

router.post('/writterapplicant_to_writter',async(req,res)=>{
  const users=await User.updateOne({_id:req.body.id},
  {$set:{writterconfirmed:true}});
  res.send(users);
})
router.post('/change_to_user',async(req,res)=>{
  const users=await User.updateOne({_id:req.body.id},
  {$set:{writterconfirmed:false}});
  res.send(users);
})


module.exports = router;
