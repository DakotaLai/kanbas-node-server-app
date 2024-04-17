import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentsRoutes from './Kanbas/assignments/routes.js';
import mongoose from "mongoose";
import UserRoutes from './Kanbas/Users/routes.js';
import "dotenv/config";
import session from "express-session";
const mongoURL = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(mongoURL);
const app = express();
// const connectToMongo = async() => {
//     try {
//         mongoose.set("strictQuery", false);
//         mongoose.connect(mongoURL);
//         console.log("success");
//     } catch (error) {
//         console.log(error);
//     }
// }
// module.exports = connectToMongo;
// console.log(process.env.FRONTEND_URL);
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
));
const sessionOptions = {
    
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);
Hello(app)
Lab5(app)
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
UserRoutes(app);
// app.get('/hello', (req, res) => {res.send('life is good')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000);