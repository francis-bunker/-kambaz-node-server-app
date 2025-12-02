import express from "express";
import Lab5 from "./Lab5/index.js";
import Modules from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import db from "./Kambaz/Database/index.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    })
);



const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  
        sameSite: "lax",  
    },
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}


app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
Modules(app);
Lab5(app);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
