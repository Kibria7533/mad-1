
const express = require("express");
const path = require("path");

const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
require('dotenv').config()
// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = express();
const cors = require("cors");
app.use(express.static(path.join(__dirname, 'public')))
// Middlewares
app.use(cors());
app.use(passport.initialize());




app.use(bp.json());


require("./middlewares/passport")(passport);

// User Router Middleware
app.use("/api/users", require("./routes/users"));
app.use(require("./routes/googleuser"));
app.use(require("./routes/facebookuser"));
app.use(require("./routes/posts"));
app.use(require("./routes/comments"));
app.use(require("./routes/reletedposts"));
app.use(require("./routes/menus"));
app.use(require("./routes/questions"));
app.use(require("./routes/courses"));
app.use(require("./routes/teachers"));


const startApp = async () => {
  try {
    // Connection With DB 
    const db=process.env.DB ||`mongodb://localhost:27017/node-auth`
    await connect(db, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    if(process.env.NODE_ENV==='production'){
      app.use(express.static('client/build'));
      app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      })
    }
    // Start Listenting for the server on PORT
    
   const PORT=process.env.PORT || 5000
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();
