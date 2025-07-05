const express=require("express")
const mongoose=require("mongoose")
const session=require('express-session')//session middleware
const MongoStore = require("connect-mongo"); //store session in mongo
const cors=require('cors')//allow cross origin request
const cookieParser=require('cookie-parser')//parse cookies
require('dotenv').config()//load .env variable

const app=express()
//middleware to parse json
app.use(express.json())

//allow frontend request running the port 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Important: allow cookies to be sent
  })
);
//parse cookies for incoming request
app.use(cookieParser())


//
app.use(
  session({
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "session",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    },
  })
);

const authRoutes = require("./routes/auth");
app.use('/api/auth',authRoutes)

//connect mongoose
main()
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;
  console.log("Connected to:", db.name);
}

//listening app
app.listen(process.env.PORT,()=>{
    console.log("server is listening")
})